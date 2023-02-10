import { Request, Response } from "express";
import CommunityRequest from "../models/CommunityRequest";

export const handleRequestCreation = async (req: Request, res: Response) => {
	console.log("handleRequestCreation called");
	const {
		username,
		requestDescription,
		location,
		requestLatitude,
		requestLongitude,
		community,
	} = req.body;

	console.log({
		username,
		requestDescription,
		location,
		requestLatitude,
		requestLongitude,
		community,
	});

	const newRequest = new CommunityRequest({
		creatorUsername: username,
		acceptorUsername: undefined,
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
