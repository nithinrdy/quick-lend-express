import { Router } from "express";
import {
	handleRequestCreation,
	handleFetchRequests,
	handleFetchRequestDetails,
} from "../controllers/requestController";

const router = Router();

router.post("/create", handleRequestCreation);
router.get("/fetch", handleFetchRequests);
router.get("/fetchdetails", handleFetchRequestDetails);

export default router;
