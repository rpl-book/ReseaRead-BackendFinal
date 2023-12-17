const db = require("../models");
const errorCatch = require("../errors/errorCatch");
const { v4: uuidv4 } = require("uuid");

const UserPost = db.UserPost;

const addPost = async (req, res) => {
  try {
    const { userId, title, postImage, description } = req.body;

    const addingPostProcess = await UserPost.create({
      postId: uuidv4(),
      title,
      postImage: Buffer.from(postImage, "base64"),
      postDate: new Date().toString(),
      description,
      userId: userId,
    });

    return res.status(200).json({
      payload: addingPostProcess,
      message: "Succesfully Create a Post",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Create Post");
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const postData = await UserPost.findOne({ where: { postId: postId } });
    if (!postData) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    await UserPost.destroy({ where: { postId: postId } });
    return res.status(200).json({ message: "Successfully delete User Post" });
  } catch (err) {
    return errorCatch(res, err, 500, "Delete Post");
  }
};

const updateLikes = async (req, res) => {
  try {
    const postId = req.params.id;

    let postData = await UserPost.findOne({ where: { postId: postId } });

    if (!postData) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    postData.likes++;
    await postData.save();

    return res.status(200).json({ message: "Post Liked Successfully" });
  } catch (err) {
    return errorCatch(res, err, 500, "Update Post");
  }
};

const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const postData = await UserPost.findOne({ where: { postId: postId } });

    if (!postData) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    return res.status(200).json({
      payload: { postData },
      message: "Successfully get the Post Data",
    });
  } catch (err) {
    return errorCatch(res, err, 400, "Get One Post");
  }
};

const getAllPost = async (req, res) => {
  try {
    const postDatas = await UserPost.findAll();

    if (!postDatas) {
      return res.status(404).json({ message: "Can't Find All Post" });
    }

    return res
      .status(200)
      .json({ payload: { postDatas }, message: "Successfully get All Post" });
  } catch (err) {
    return errorCatch(res, err, 400, "Get All User");
  }
};

const getAllPostByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const postDatas = await UserPost.findAll({ where: { userId: userId } });

    return res.status(200).json({
      payload: { postDatas },
      message: "Successfully get User Post's",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Get All Post");
  }
};

module.exports = {
  addPost,
  deletePost,
  updateLikes,
  getOnePost,
  getAllPost,
  getAllPostByUserId,
};
