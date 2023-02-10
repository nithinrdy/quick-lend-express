import { Request, Response } from "express";
import CommunityRequest from "../models/CommunityRequest";

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
	const { community } = req.body;

	if (!community) {
		return res.status(400).json("Community not provided/invalid");
	}

	try {
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
