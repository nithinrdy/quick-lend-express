import { Request, Response } from "express";
import CommunityRequest from "../models/CommunityRequest";
import User from "../models/User";

export const handleRequestCreation = async (req: Request, res: Response) => {
	const {
		username,
		requestDescription,
		location,
		requestLatitude,
		requestLongitude,
		community,
	} = req.body;

	const newRequest = new CommunityRequest({
		creatorUsername: username,
		acceptorUsername: null,
		requestDescription,
		location,
		requestLatitude,
		requestLongitude,
		community,
		cancelled: false,
		completed: false,
	});

	try {
		await newRequest.save();
		return res.status(201).json("Request created successfully");
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const handleFetchRequests = async (req: Request, res: Response) => {
	const { username } = req.body;
	if (!username) {
		return res.status(400).json("Invalid request");
	}

	try {
		const user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res.status(400).json("Invalid request");
		}
		const community = user.community;
		const requests = await CommunityRequest.find({
			community: community,
		})
			.sort({ createdAt: -1 })
			.exec();
		return res.status(200).json(requests);
	} catch (err) {
		return res.status(500).json(err);
	}
};
