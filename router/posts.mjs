import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();

const validatePost = [
  body("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("최소 5자 이상 입력하세요"),
];

//모든 포스트 가져오기

//해당 아이디에 대한 포스트 가져오기(GET)
//http://127.0.0.1:8080/posts
//http://127.0.0.1:8080/posts/userid=apple
router.get("/", isAuth, postController.getPosts);

//글 번호에 대한 포스트 가져오기(GEt)
router.get("/:id", isAuth, postController.getPost);

//http://127.0.0.1:8080/posts/:id

//포스트 쓰기(post)
//http://127.0.0.1:8080/posts:id
//json 형태로 입력후 저장
router.post("/", validatePost, isAuth, postController.createPost);

//포스트 수정하기(put)
//json 형태로 입력후 저장
router.put("/:id", validatePost, isAuth, postController.updatePost);

//포스트 삭제하기(delete)
//http://127.0.0.1:8000/posts/:id
router.delete("/:id", postController.deletePost);

export default router;
