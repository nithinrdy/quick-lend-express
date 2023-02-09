import mongoose, { Schema } from "mongoose";

export interface IRequest extends mongoose.Document {
	creatorUsername: string;
	acceptorUsername: string;
	requestDescription: string;
	location: string;
	requestLatitude?: number;
	requestLongitude?: number;
	community: string;
	completed: boolean;
	cancelled: boolean;
}

const RequestSchema: Schema = new Schema(
	{
		creatorUsername: { type: String, required: true },
		acceptorUsername: { type: String, required: true },
		requestDescription: { type: String, required: true },
		location: { type: String, required: true },
		requestLatitude: { type: Number },
		requestLongitude: { type: Number },
		community: { type: String, required: true },
		completed: { type: Boolean, required: true },
		cancelled: { type: Boolean, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IRequest>("Request", RequestSchema);
