import * as authRepository from "../data/authhw.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 회원가입 페이지 보여주기
export async function showSignup(req, res) {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
}

// 로그인 페이지 보여주기
export async function showLogin(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
}

// 회원가입 기능
export async function signup(req, res) {
  const { userid, password, name, email } = req.body;

  if (!userid || !password || !name || !email) {
    return res.status(400).json({ message: "빈칸을 입력해주세요." });
  }

  try {
    const user = await authRepository.signUp(userid, password, name, email);
    res.status(201).json({ message: `${user.userid}님 회원가입 성공!` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

// 로그인 기능
export async function login(req, res) {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res
      .status(400)
      .json({ message: "아이디와 비밀번호를 입력해주세요." });
  }

  try {
    const user = await authRepository.login(userid, password);
    res.status(200).json({ message: `${user.userid}님 로그인 성공!` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}
