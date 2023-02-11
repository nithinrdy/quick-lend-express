import { Router } from "express";
import {
	handleRequestCreation,
	handleFetchRequests,
	handleFetchRequestDetails,
} from "../controllers/requestController";
import { handleRequestDetailsUpdate } from "../controllers/requestUpdatesController";

const router = Router();

router.post("/create", handleRequestCreation);
router.get("/fetch", handleFetchRequests);
router.get("/fetchdetails", handleFetchRequestDetails);
router.put("/update", handleRequestDetailsUpdate);

export default router;
