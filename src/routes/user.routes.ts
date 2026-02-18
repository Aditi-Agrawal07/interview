import { Router } from "express"; 

import {getBillingSummary, getCurrentUsage} from "../controller/user.controller";

const router = Router();

router.get("/:id/usage", getCurrentUsage);
router.get("/:id/billing-summary", getBillingSummary);

export default router;