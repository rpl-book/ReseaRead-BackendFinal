const express = require("express");
const router = express.Router();

const libraryController = require("../controllers/library.controller");

router.post("/addBook", libraryController.addBookToLib);
router.delete("/remove/:id", libraryController.removeBookFromLib);
router.put("/:userId/:bookId", libraryController.updateBookDataInLib);
router.get("/:id", libraryController.getAllBookLibByUserId);
//router.get("/user/:id/status", libraryController.getAllBookByStatus);

module.exports = router;
