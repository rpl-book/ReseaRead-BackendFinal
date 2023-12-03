const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);
router.get("/allUser", authController.getAllUser);
router.get("/:id", authController.getOneUser);
router.get("/name/:name", authController.getAllUserByName);
router.put("/:id", authController.editUser);
router.delete("/:id", authController.deleteUser);

module.exports = router;
