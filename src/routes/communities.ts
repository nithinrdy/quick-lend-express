import { Router } from "express";
import {
	handleCommunityCreation,
	handleFetchCommunities,
	handleJoinCommunity,
} from "../controllers/communityController";

const router = Router();

router.get("/fetch", handleFetchCommunities);
router.post("/create", handleCommunityCreation);
router.put("/join", handleJoinCommunity);

export default router;
