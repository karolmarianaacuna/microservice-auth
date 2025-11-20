import { Router } from "express";
import { newUsers } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register',newUsers);

export default router;
