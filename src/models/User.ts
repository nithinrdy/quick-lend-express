import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	community?: string;
	refreshToken?: string;
}

const UserSchema: Schema = new Schema(
	{
		// Basic user information
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		// The community the user is a part of
		community: { type: String },
		// User's refresh token
		refreshToken: { type: String },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUser>("User", UserSchema);
