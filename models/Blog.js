const mongoose = require('mongoose');




const blogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: [true, 'Please enter your blog title']
  },
  description: {
    type: String,
    required: [true, 'Please enter your blog description']
  },
  content: {
    type: String,
    required: [true, 'Please enter your blog content']
  },
  createdBy: {
    type: String
  }
});
blogSchema.set('timestamps', true)



const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;