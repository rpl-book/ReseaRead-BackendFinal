const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const errorCatch = require("../errors/errorCatch");

const Book = db.Book;

const addBook = async (req, res) => {
  try {
    const { author, description, rating, genre, coverImage, page, title } =
      req.body;

    const maxDescriptionLength = 100;

    if (page < 0) {
      return res.status(400).json({ message: "Pages couldn't be negative" });
    }

    if (description.length >= maxDescriptionLength) {
      return res
        .status(400)
        .json({ message: "Description can't be more than 1000" });
    }

    const isBookExist = await Book.findOne({ where: { title: title } });

    if (isBookExist) {
      return res.status(401).json({ message: "Book has alreay registered" });
    }

    const addBookProcess = await Book.create({
      bookId: uuidv4(),
      title,
      author,
      description,
      rating,
      genre,
      coverImage,
      page,
    });

    return res.status(200).json({
      payload: addBookProcess,
      message: "Success add new Book to our App",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Add New Book");
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const bookData = await Book.findOne({ where: { bookId: bookId } });

    if (!bookData) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    await Book.destroy({ where: { bookId: bookId } });
    return res.status(200).json({ message });
  } catch (err) {
    return errorCatch(res, err, 500, "Delete Book");
  }
};

//const updateRating = async (req, res) => {};

const getOneBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const isExistBookData = await Book.findOne({ where: { bookId: bookId } });

    if (!isExistBookData) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    return res.status(200).json({
      payload: { isExistBookData },
      message: "Successfully get book data",
    });
  } catch (err) {
    return errorCatch(res, err, 400, "Get One Book");
  }
};

const getAllBook = async (req, res) => {
  try {
    const bookData = await Book.findAll();

    if (!bookData) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    return res.status(200).json({
      payload: { bookData },
      message: "Successfully get book data",
    });
  } catch (err) {
    return errorCatch(res, err, 400, "Get All Book");
  }
};
const getAllBookByName = async (req, res) => {
  try {
    const bookName = req.query.name;

    if (!bookName) {
      return res
        .status(400)
        .json({ message: "Cant Seem to find book based on search" });
    }

    const bookData = await Book.findAll({
      where: {
        bookName: {
          [Op.like]: `%${bookName}%`,
        },
      },
    });

    if (!bookData || bookData.length === 0) {
      return res.status(404).json({ message: "No book found" });
    }

    return res.status(200).json({
      payload: { bookData },
      message: "Successfully get books by name",
    });
  } catch (err) {
    return errorCatch(res, req, 500, "Get Book by Name");
  }
};

module.exports = {
  addBook,
  deleteBook,
  getOneBook,
  getAllBook,
  getAllBookByName,
};
