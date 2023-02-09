import { Router } from "express";
import { editProfile } from "../controllers/editProfileController";

const router = Router();

router.put("/", editProfile);

export default router;
