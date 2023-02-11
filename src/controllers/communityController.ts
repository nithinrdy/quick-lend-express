import { Request, Response } from "express";
import Community from "../models/Community";
import User from "../models/User";

export const handleCommunityCreation = async (req: Request, res: Response) => {
	const { id, name, description, latitude, longitude } = req.body;
	const { username } = req.body;

	if (!id || !name || !description || !latitude || !longitude) {
		return res.status(400).json("All fields are required.");
	}

	if (username !== "admin") {
		return res.status(401).json("Unauthorized.");
	}

	try {
		const community = await Community.findOne({ communityId: id }).exec();

		if (community) {
			return res.status(400).json("ID is already in use.");
		}

		const newCommunity = new Community({
			communityId: id,
			communityName: name,
			communityDescription: description,
			communityLatitude: latitude,
			communityLongitude: longitude,
		});

		await newCommunity.save();

		res.status(201).json("Community created successfully.");
	} catch (err) {
		res.status(500).json(err);
	}
};

export const handleFetchCommunities = async (req: Request, res: Response) => {
	try {
		const communities = await Community.find().exec();

		res.status(200).json({
			message: "Communities fetched successfully.",
			communities: communities,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

export const handleJoinCommunity = async (req: Request, res: Response) => {
	const { communityId } = req.body;
	const { username } = req.body;

	if (!communityId) {
		return res.status(400).json("Community ID is required.");
	}

	try {
		const user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res.status(400).json("User could not be found.");
		}

		const community = await Community.findOne({
			communityId: communityId,
		}).exec();
		if (!community) {
			return res.status(400).json("Community could not be found.");
		}

		await user.updateOne({ community: communityId }).exec();

		const updatedUser = await User.findOne({ username: username }).exec();

		res.status(200).json({
			message: "User joined community successfully.",
			updatedUser: updatedUser,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};
