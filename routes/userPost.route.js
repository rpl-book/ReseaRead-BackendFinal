const express = require("express");
const router = express.Router();

const userPostController = require("../controllers/userPost.controller");

router.post("/newPost", userPostController.addPost);
router.delete("/:id", userPostController.deletePost);
router.patch("/like/:id", userPostController.updateLikes);
router.get("/post/:id", userPostController.getOnePost);
router.get("/allPost", userPostController.getAllPost);
router.get("/user/:id/posts", userPostController.getAllPostByUserId);

module.exports = router;
