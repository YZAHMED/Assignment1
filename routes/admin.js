import express from 'express';
import Author from '../models/author.js';
import Book from '../models/book.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin_dashboard');
});

router.get('/authors', async (req, res) => {
  const authors = await Author.find().sort({ name: 1 });
  res.render('authors_list', { authors });
});

router.get('/authors/add', (req, res) => {
  res.render('author_form');
});

router.post('/authors/add', async (req, res) => {
  const { name, bio, birthdate } = req.body;
  try {
    await Author.create({ name, bio, birthdate });
    res.redirect('/admin/authors');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/authors/add');
  }
});

router.post('/authors/:id/delete', async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/admin/authors');
});

router.get('/authors/:id/edit', async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.render('author_edit_form', { author });
});

router.post('/authors/:id/edit', async (req, res) => {
  const { name, bio, birthdate } = req.body;
  try {
    await Author.findByIdAndUpdate(req.params.id, { name, bio, birthdate });
    res.redirect('/admin/authors');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/authors');
  }
});

router.get('/books', async (req, res) => {
  const books = await Book.find().populate('author').sort({ title: 1 });
  res.render('books_list', { books });
});

router.get('/books/add', async (req, res) => {
  const authors = await Author.find();
  res.render('book_form', { authors });
});

router.post('/books/add', async (req, res) => {
  const { title, author, summary, publishedYear } = req.body;
  try {
    await Book.create({ title, author, summary, publishedYear });
    res.redirect('/admin/books');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/books/add');
  }
});

router.post('/books/:id/delete', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/admin/books');
});

router.get('/books/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  const authors = await Author.find();
  res.render('book_edit_form', { book, authors });
});

router.post('/books/:id/edit', async (req, res) => {
  const { name, author, summary, publishedYear } = req.body;
  try {
    await Book.findByIdAndUpdate(req.params.id, { title: name, author, summary, publishedYear });
    res.redirect('/admin/books');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/books');
  }
});

export default router; 