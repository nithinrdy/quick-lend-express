import { CorsOptions } from "cors";

const whiteList = [process.env.FRONTEND_URL_FOR_CORS as string];
const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		if (origin && whiteList.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

export default corsOptions;
