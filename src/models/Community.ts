import mongoose, { Schema } from "mongoose";

export interface ICommunity extends mongoose.Document {
	communityName: string;
	communityDescription: string;
	communityLatitude: number;
	communityLongitude: number;
}

const CommunitySchema: Schema = new Schema(
	{
		communityName: { type: String, required: true },
		communityDescription: { type: String, required: true },
		communityLatitude: { type: Number, required: true },
		communityLongitude: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<ICommunity>("Community", CommunitySchema);
