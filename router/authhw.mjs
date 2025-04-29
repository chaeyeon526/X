import express from "express";
import * as authController from "../controller/authhw.mjs";

const router = express.Router();

// 회원가입/로그인 페이지 제공
router.get("/signup", authController.showSignup);
router.get("/login", authController.showLogin);

// 회원가입/로그인 API
router.post("/signup", authController.signup);
router.post("/login", authController.login);

export default router;
