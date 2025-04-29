/*

Authorization:본인의 신원을 증명하는 과정

Authorization  헤더
-http 요청을 보낼때 헤더라는 곳에 추가정보를 담기 가능
-인증정보를 담는 표준 위치가 authorization  헤더임

Bearer
-authorization에 실을 수 있는 방식 중 하나
-토큰을 가지고 있다는것 자체로 인증함

authorization:Bearer<토큰>
*/

import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";
import { config } from "../config.mjs";

const AUTH_ERROR = { message: "인증에러" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    console.log("헤더 에러");
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      console.log("토큰 에러");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded.id);
    const user = await authRepository.findByid(decoded.id);
    if (!user) {
      console.log("아이디 없음");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log("user.id: ", user.id);
    console.log("user.userid: ", user.userid);
    req.userid = user.userid;
    next();
  });
};
