import express from 'express';
import Author from '../models/author.js';
import Book from '../models/book.js';

const router = express.Router();

router.get('/authors', async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

router.get('/books', async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
});

router.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

export default router; 