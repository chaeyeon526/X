import express from "express";
import cors from "cors";
import authRouter from "./router/authhw.mjs";

const app = express();
const PORT = 8080;

// 미들웨어 등록
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 등록
app.use("/auth", authRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://127.0.0.1:${PORT}`);
});
