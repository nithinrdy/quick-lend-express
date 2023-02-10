import { Router } from "express";
import {
	handleRequestCreation,
	handleFetchRequests,
} from "../controllers/requestController";

const router = Router();

router.post("/create", handleRequestCreation);
router.get("/fetch", handleFetchRequests);

export default router;
