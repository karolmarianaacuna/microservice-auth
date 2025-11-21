import { Router } from "express";
import { newUsers, loginUser } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register',newUsers);
router.post('/login',loginUser);

export default router;
