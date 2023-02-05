import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const handleRegistration = async (req: Request, res: Response) => {
	const {
		registerEmail,
		registerUsername,
		registerPassword,
		registerFirstName,
		registerLastName,
		registerPhoneNumber,
	} = req.body;
	if (
		!registerEmail ||
		!registerUsername ||
		!registerPassword ||
		!registerFirstName ||
		!registerLastName ||
		!registerPhoneNumber
	) {
		return res.status(400).json("Missing basic information");
	}
	let duplicate = await User.findOne({ username: registerUsername }).exec();
	if (duplicate) {
		return res.status(409).json("Username already exists");
	}
	duplicate = await User.findOne({ email: registerEmail }).exec();
	if (duplicate) {
		return res.status(409).json("Email already exists");
	}
	try {
		const hashedPassword = await bcrypt.hash(registerPassword, 10);
		const newUser = new User({
			email: registerEmail,
			username: registerUsername,
			password: hashedPassword,
			firstName: registerFirstName,
			lastName: registerLastName,
			phoneNumber: registerPhoneNumber,
		});

		const result = await newUser.save();
		console.log(result);
		return res
			.status(201)
			.json("Registration successful for " + registerUsername + "!");
	} catch (err) {
		return res.status(500).json(err);
	}
};

const handleLogin = async (req: Request, res: Response) => {
	const { loginEmail, loginPassword } = req.body;
	if (!loginEmail || !loginPassword) {
		return res.status(400).json("Email and password are required");
	}
	const userExists = await User.findOne({ email: loginEmail }).exec();
	if (!userExists) {
		return res.status(404).json("User not found");
	}
	const passwordMatch = await bcrypt.compare(
		loginPassword,
		userExists.password
	);
	if (!passwordMatch) {
		return res.status(401).json("Incorrect password");
	}
	const accessToken = jwt.sign(
		{ email: userExists.email },
		process.env.ACCESS_TOKEN_SECRET!,
		{
			expiresIn: "1d",
		}
	);
	const refreshToken = jwt.sign(
		{ email: userExists.email },
		process.env.REFRESH_TOKEN_SECRET!,
		{
			expiresIn: "30d",
		}
	);
	await User.updateOne(
		{ email: loginEmail },
		{ refreshToken: refreshToken }
	).exec();
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "none",
		secure: true,
	});
	return res
		.status(200)
		.json({ message: "Sign in successful", accessToken: accessToken });
};

export { handleRegistration, handleLogin };
