import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
	origin: function (origin, callback) {
		const allowedOrigin = process.env.FRONTEND_URL_FOR_CORS as string;
		if (origin && allowedOrigin === origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

export default corsOptions;
