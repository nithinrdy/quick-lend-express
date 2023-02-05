import express from "express";
import cors from "cors";
import corsOptions from "./config/cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import mongoose from "mongoose";
import connectToDb from "./config/dbConn";
// Routes
import userAuthRouter from "./routes/userAuth";
const app = express();
const PORT = process.env.PORT || 4000;

config();
connectToDb();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userAuthRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

mongoose.connection.once("connected", () => {
	app.listen(PORT, () => {
		console.log(`Listening at http://localhost:${PORT}`);
	});
});

process.on("SIGINT", () => {
	mongoose.connection.close(function () {
		console.log("MongoDB disconnected");
		process.exit(0);
	});
});
