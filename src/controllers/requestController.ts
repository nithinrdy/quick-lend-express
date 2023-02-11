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

export const handleFetchRequestDetails = async (
	req: Request,
	res: Response
) => {
	const { requestId } = req.query;
	const { username } = req.body;

	if (!requestId) {
		return res.status(400).json("requestId not found");
	}

	if (!username) {
		return res.status(400).json("username not found");
	}

	try {
		const communityRequest = await CommunityRequest.findById(requestId).exec();

		if (!communityRequest) {
			return res.status(400).json("Could not find any matching request");
		}

		let contactNumber = "";

		if (communityRequest.creatorUsername === username) {
			if (communityRequest.acceptorUsername) {
				const user = await User.findOne({
					username: communityRequest.acceptorUsername,
				}).exec();

				if (!user) {
					return res.status(400).json("Invalid user as acceptor");
				}
				contactNumber = user.phoneNumber;
			}
		} else if (communityRequest.acceptorUsername === username) {
			const user = await User.findOne({
				username: communityRequest.creatorUsername,
			}).exec();
			if (!user) {
				return res.status(400).json("Could not find creator user");
			}
			contactNumber = user.phoneNumber;
		}

		const responseData = {
			_id: communityRequest._id,
			creatorUsername: communityRequest.creatorUsername,
			acceptorUsername: communityRequest.acceptorUsername,
			requestDescription: communityRequest.requestDescription,
			location: communityRequest.location,
			requestLatitude: communityRequest.requestLatitude,
			requestLongitude: communityRequest.requestLongitude,
			community: communityRequest.community,
			cancelled: communityRequest.cancelled,
			completed: communityRequest.completed,
			contactNumber: contactNumber ? contactNumber : null,
		};

		return res
			.status(200)
			.json({ message: "Request found", data: responseData });
	} catch (err) {
		return res.status(500).json(err);
	}
};
