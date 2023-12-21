const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const errorCatch = require("../errors/errorCatch");

const Library = db.Library;
const Book = db.Book;

const addBookToLib = async (req, res) => {
  try {
    const { userId, title, readStatus, pageProgress, listType } = req.body;

    const isBookDataExist = await Book.findOne({ where: { title: title } });

    if (!isBookDataExist) {
      return res.status(404).json({ message: "Book not Found" });
    }

    const isInLibrary = await Library.findOne({
      where: { userId: userId, bookId: isBookDataExist.bookId },
    });

    if (isInLibrary) {
      return res
        .status(409)
        .json({ message: "Book is already in the library" });
    }

    const newLibrary = await Library.create({
      libraryId: uuidv4(),
      userId: userId,
      bookId: isBookDataExist.bookId,
      readStatus,
      pageProgress,
      dateAdded: new Date().toString(),
      listType,
    });

    return res.status(200).json({
      message: "Successfully Add Book to Library",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Add Book to Library");
  }
};

const deleteBookFromLib = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const bookInLib = await Library.findOne({
      where: { userId: userId, bookId: bookId },
    });

    if (!bookInLib) {
      return res
        .status(404)
        .json({ message: "Failed to Find Book in Library" });
    }

    await Library.destroy({ where: { userId: userId, bookId: bookId } });
    return res
      .status(200)
      .json({ message: "Successfully Delete Book from Library" });
  } catch (err) {
    return errorCatch(res, err, 500, "Delete Book from Library");
  }
};

const updateBookDataInLib = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { readStatus, pageProgress, dateAdded } = req.body;

    const updateBookLib = await Library.update(
      {
        readStatus,
        pageProgress,
        dateAdded,
      },
      { where: { userId: userId, bookId: bookId } }
    );

    return res
      .status(200)
      .json({ payload: { updateBookLib }, message: "Successfully Edit User" });
  } catch (err) {
    return errorCatch(res, err, 500, "Update Book in Library");
  }
};

const getAllBookLibByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = req.query.page;
    const booksPerPage = req.query.booksPerPage;

    const hasPagination = page !== undefined && booksPerPage !== undefined;

    const offset = hasPagination
      ? (parseInt(page) - 1) * parseInt(booksPerPage)
      : undefined;
    const limit = hasPagination ? parseInt(booksPerPage) : undefined;

    const libBooks = await Library.findAll({
      where: { userId: userId },
      include: [
        { model: Book, attributes: ["coverImage", "page", "author", "title"] },
      ],
      limit,
      offset,
    });

    return res.status(200).json({
      libraryBooks: libBooks,
    });
  } catch (err) {
    errorCatch(res, err, 500, "Get All User's Book");
  }
};

const getAllBookByStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const readStatus = req.body;
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 10;

    const offset = (page - 1) * itemsPerPage;

    const libBooks = await Library.findAll({
      where: { userId: userId, readStatus: readStatus },
      limit: itemsPerPage,
      offset: offset,
    });

    const totalBooks = await Library.count({ where: { userId: userId } });
    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    return res.status(200).json({
      libraryBooks: libBooks,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Get User's Book Read Status");
  }
};

module.exports = {
  addBookToLib,
  deleteBookFromLib,
  updateBookDataInLib,
  getAllBookLibByUserId,
  getAllBookByStatus,
};
