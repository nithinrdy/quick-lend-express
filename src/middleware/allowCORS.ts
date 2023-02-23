import { Request, Response, NextFunction } from "express";

const allowCORS = async (req: Request, res: Response, next: NextFunction) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
};

export default allowCORS;
