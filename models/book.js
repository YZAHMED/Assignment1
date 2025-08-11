import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  summary: {
    type: String,
    default: '',
  },
  publishedYear: {
    type: Number,
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book; 