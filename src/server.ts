import express from "express";
import cors, { CorsOptions } from "cors";
const app = express();
const port = process.env.PORT || 4000;

const whiteList = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		if ((origin && whiteList.indexOf(origin) !== -1) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
