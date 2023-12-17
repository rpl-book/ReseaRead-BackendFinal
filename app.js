const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// Routers
const userRouter = require("./routes/auth.route");
const userPostRouter = require("./routes/userPost.route");
const bookRouter = require("./routes/book.route");
const libraryRouter = require("./routes/library.route");
const reviewRouter = require("./routes/review.route");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routers
app.use("/api/user", userRouter);
app.use("/api/userPost", userPostRouter);
app.use("/api/book", bookRouter);
app.use("/api/library", libraryRouter);
app.use("/api/review", reviewRouter);

//Test API
app.get("/", (req, res) => {
  res.json({ message: "Assalamulaikum" });
});

//PORT
const PORT = process.env.PORT || 8080;

//Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
