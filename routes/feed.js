const express = require("express");
const { body } = require("express-validator/check");

const feedController = require("../controllers/feed");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/posts", isAuth, feedController.getPosts);

router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 4 }),
    body("content").trim().isLength({ min: 4 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", isAuth, feedController.getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 4 }),
    body("content").trim().isLength({ min: 4 }),
  ],
  feedController.editPost
);

router.delete("/post/:postId", isAuth, feedController.deletePost);

router.get("/userstatus", isAuth, feedController.getStatus);

module.exports = router;
