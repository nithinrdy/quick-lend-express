import { Request, Response } from "express";
import Community from "../models/Community";

export const handleCommunityCreation = async (req: Request, res: Response) => {
	const { id, name, description, latitude, longitude } = req.body;

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
