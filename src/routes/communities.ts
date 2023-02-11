import { Router } from "express";
import {
	handleCommunityCreation,
	handleFetchCommunities,
} from "../controllers/communityController";

const router = Router();

router.get("/fetch", handleFetchCommunities);
router.post("/create", handleCommunityCreation);

export default router;
