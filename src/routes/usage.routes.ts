import { Router } from "express";
import { addUsage } from "../controller/usage.controller";

const router = Router();
router.post("/", addUsage);

export default router;