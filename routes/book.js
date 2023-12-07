const express = require("express");
const router = express.Router();

const booksController = require("../controllers/BooksController");
const checkPermission = require("../middlewares/index");
router.get("/:id", booksController.getBookDetail);
router.get("/", booksController.getAllBooks);
router.post("/",checkPermission, booksController.createBook);
router.put("/:id",checkPermission, booksController.updateBook);
router.delete("/:id",checkPermission, booksController.deleteBook);
module.exports = router;
