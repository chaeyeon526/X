// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRepository = require("./authRepository"); // authRepository 가져오기

const app = express();
const PORT = 8080;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 바디 파서
app.use(express.static(path.join(__dirname, "public"))); // public 폴더를 정적 서비스

// 회원가입 API
app.post("/auth/signup", (req, res) => {
  try {
    const { userid, password, name, email } = req.body;

    if (!userid || !password || !name || !email) {
      return res.status(400).json({ message: "모든 항목을 입력하세요." });
    }

    const existingUser = authRepository.findByUserid(userid);
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    authRepository.save({ userid, password, name, email });
    console.log("[회원가입 완료]", authRepository.findAll());
    res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("[서버 에러] 회원가입 실패:", error);
    res.status(500).json({ message: "서버 내부 오류" });
  }
});

// 로그인 API
app.post("/auth/login", (req, res) => {
  try {
    const { userid, password } = req.body;

    const user = authRepository.findByUserid(userid);
    if (user && user.password === password) {
      const fakeToken = `token-${userid}-${Date.now()}`;
      res.json({ message: "로그인 성공", token: fakeToken });
    } else {
      res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
    }
  } catch (error) {
    console.error("[서버 에러] 로그인 실패:", error);
    res.status(500).json({ message: "서버 내부 오류" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버가 실행되었습니다: http://127.0.0.1:${PORT}`);
});
