import { Request, Response } from "express";
import CommunityRequest from "../models/CommunityRequest";

export const handleRequestDetailsUpdate = async (
	req: Request,
	res: Response
) => {
	const { updateType, requestId } = req.body;
	const { username } = req.body;

	if (!updateType) {
		return res.status(400).json("updateType not found");
	}

	if (!requestId) {
		return res.status(400).json("requestId not found");
	}

	switch (updateType) {
		case "accept":
			try {
				const request = await CommunityRequest.findById(requestId).exec();
				if (!request) {
					return res.status(400).json("Could not find any matching request");
				}
				if (request.acceptorUsername) {
					return res.status(400).json("Request already accepted");
				}
				if (request.cancelled || request.completed) {
					return res.status(400).json("Request cannot be accepted");
				}
				if (request.creatorUsername === username) {
					return res
						.status(400)
						.json("Request creator cannot accept their own request");
				}
				await request.updateOne({ acceptorUsername: username });
				return res.status(200).json("Request accepted");
			} catch (err) {
				return res.status(500).json(err);
			}
		case "cancel":
			try {
				const request = await CommunityRequest.findById(requestId).exec();
				if (!request) {
					return res.status(400).json("Could not find any matching request");
				}
				if (request.cancelled || request.completed) {
					return res.status(400).json("Request is already cancelled/completed");
				}
				if (request.creatorUsername !== username) {
					return res
						.status(400)
						.json("Only request creator can cancel the request");
				}
				await request.updateOne({ cancelled: true });
				return res.status(200).json("Request cancelled");
			} catch (err) {
				return res.status(500).json(err);
			}
		case "complete":
			try {
				const request = await CommunityRequest.findById(requestId).exec();
				if (!request) {
					return res.status(400).json("Could not find any matching request");
				}
				if (request.cancelled || request.completed) {
					return res.status(400).json("Request is already cancelled/completed");
				}
				if (request.creatorUsername !== username) {
					return res
						.status(400)
						.json("Only request creator can mark the request as completed");
				}
				await request.updateOne({ completed: true });
				return res.status(200).json("Request marked as completed");
			} catch (err) {
				return res.status(500).json(err);
			}
		case "abandon":
			try {
				const request = await CommunityRequest.findById(requestId).exec();
				if (!request) {
					return res.status(400).json("Could not find any matching request");
				}
				if (request.cancelled || request.completed) {
					return res.status(400).json("Request is already cancelled/completed");
				}
				if (request.acceptorUsername !== username) {
					return res
						.status(400)
						.json("You aren't the acceptor of this request");
				}
				await request.updateOne({ acceptorUsername: null });
				return res.status(200).json("Request abandoned");
			} catch (err) {
				return res.status(500).json(err);
			}
	}
};
