import { Router } from "express";
import { handleCommunityCreation } from "../controllers/communityController";

const router = Router();

router.post("/create", handleCommunityCreation);

export default router;
