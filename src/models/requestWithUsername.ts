import { Request } from "express";
export default interface RequestWithUsername extends Request {
	username: string;
}
