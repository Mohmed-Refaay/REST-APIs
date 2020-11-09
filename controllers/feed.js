const { validationResult, Result } = require("express-validator/check");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        posts,
        messsage: "postes fetched",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("Invalid Title or Content");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title,
    content,
    imageUrl: "images/walter.jpg",
    creator: { name: "Refaay" },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        messsage: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId)
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("No Post Found!");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ messsage: "Post fetched!", post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
