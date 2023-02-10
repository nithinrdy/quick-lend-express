import { IUser } from "./../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User";
import { Types } from "mongoose";

export const editProfile = async (req: Request, res: Response) => {
	const { editProperty, editValue } = req.body;
	const { username } = req.body;

	if (!editProperty || !editValue) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const user = await User.findOne({ username: username }).exec();
		if (!user) {
			return res
				.status(400)
				.json("User not found. Your token seems to be invalid");
		}
		switch (editProperty) {
			case "email":
				console.log(editValue);
				return editEmail(user, editValue, res);
			case "password":
				return editPassword(user, editValue, res);
			case "firstName":
				return editFirstName(user, editValue, res);
			case "lastName":
				return editLastName(user, editValue, res);
			case "phoneNumber":
				return editPhoneNumber(user, editValue, res);
			default:
				return res.status(400).json({ message: "Invalid edit property" });
		}
	} catch (err) {
		return res.status(500).json(err);
	}
};

const editEmail = async (
	user: IUser & { _id: Types.ObjectId },
	newEmail: string,
	res: Response
) => {
	try {
		await user.updateOne({ email: newEmail }).exec();
		return res.status(200).json({
			message: "Email updated successfully",
			user: {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber,
				email: newEmail,
				community: user.community,
			},
		});
	} catch (err) {
		return res.status(400).json(err);
	}
};

const editPassword = async (
	user: IUser & { _id: Types.ObjectId },
	newPassword: string,
	res: Response
) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(newPassword, salt);

	try {
		await user.updateOne({ password: hashedPassword }).exec();

		return res.status(200).json({
			message: "Password updated successfully",
			user: {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber,
				email: user.email,
				community: user.community,
			},
		});
	} catch (err) {
		return res.status(400).json(err);
	}
};

const editFirstName = async (
	user: IUser & { _id: Types.ObjectId },
	newFirstName: string,
	res: Response
) => {
	try {
		await user.updateOne({ firstName: newFirstName }).exec();

		return res.status(200).json({
			message: "First name updated successfully",
			user: {
				username: user.username,
				firstName: newFirstName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber,
				email: user.email,
				community: user.community,
			},
		});
	} catch (err) {
		return res.status(400).json(err);
	}
};

const editLastName = async (
	user: IUser & { _id: Types.ObjectId },
	newLastName: string,
	res: Response
) => {
	try {
		await user.updateOne({ lastName: newLastName }).exec();

		return res.status(200).json({
			message: "Last name updated successfully",
			user: {
				username: user.username,
				firstName: user.firstName,
				lastName: newLastName,
				phoneNumber: user.phoneNumber,
				email: user.email,
				community: user.community,
			},
		});
	} catch (err) {
		return res.status(400).json(err);
	}
};

const editPhoneNumber = async (
	user: IUser & { _id: Types.ObjectId },
	newPhoneNumber: string,
	res: Response
) => {
	try {
		await user.updateOne({ phoneNumber: newPhoneNumber }).exec();

		return res.status(200).json({
			message: "Phone number updated successfully",
			user: {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				phoneNumber: newPhoneNumber,
				email: user.email,
				community: user.community,
			},
		});
	} catch (err) {
		return res.status(400).json(err);
	}
};
