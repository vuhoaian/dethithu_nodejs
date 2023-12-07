// code base
const Book = require("../models/BookModel");

const bookValidator = require("../validations/book");
class BookstsController {
  // [GET] /books
  async getAllBooks(req, res) {
    try {
      const books = await Book.find()
      res.json(books);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // [GET] /products/:id
  async getBookDetail(req, res) {
    try {
      const book = await Book.findOne({ _id: req.params.id})
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // [POST] /books
  async createBook(req, res) {
    try {
      // Bước 1: Validate email, password
      const { error } = bookValidator.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ errors });
      }
      const book= new Book({ ...req.body});
      const saveBook = await book.save();
      res.json({ message: "Thêm sách thành công!", data: saveBook });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // [PUT] /books/:id
  async updateBook(req, res) {
    try {
      const book = await Book.updateOne({ _id: req.params.id }, req.body);
      res
        .status(200)
        .json({ message: "Cập nhật sách thành công", data: book });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // [DELETE] /books/:id
  async deleteBook(req, res) {
    try {
      await Book.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Xóa sách thành công" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new BookstsController();
