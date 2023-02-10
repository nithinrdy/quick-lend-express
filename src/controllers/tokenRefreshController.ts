import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";

interface DecodedJwt {
	username: string;
	iat: number;
	exp: number;
}

export const handleTokenRefresh = (req: Request, res: Response) => {
	const refreshToken: string = req.cookies ? req.cookies.refreshToken : null;
	if (!refreshToken) {
		return res.status(401).json("No refresh token received.");
	}

	try {
		User.findOne({ refreshToken: refreshToken }).exec((err, user) => {
			if (err) {
				return res.status(500).json(err);
			}
			if (!user) {
				return res.status(403).json("No matching user found.");
			}
			jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET!,
				(err, decoded) => {
					if (err || (decoded as DecodedJwt).username != user.username)
						return res.status(403).json("Invalid refresh token.");
				}
			);

			const accessToken = jwt.sign(
				{ username: user.username },
				process.env.ACCESS_TOKEN_SECRET!,
				{
					expiresIn: "1d",
				}
			);
			return res.status(200).json({
				message: "Token refreshed",
				user: {
					accessToken: accessToken,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					phoneNumber: user.phoneNumber,
					email: user.email,
					community: user.community,
				},
			});
		});
	} catch (err) {
		return res.status(500).json(err);
	}
};
