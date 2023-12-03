const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");

router.post("/addBook", bookController.addBook);
router.delete("/delete/:id", bookController.deleteBook);
router.get("/books", bookController.getAllBook);
router.get("/:id", bookController.getOneBook);
router.get("/books/:name", bookController.getAllBookByName);

module.exports = router;
