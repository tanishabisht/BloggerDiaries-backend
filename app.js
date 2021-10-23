const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');

require('dotenv').config()

const app = express();


// middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());


// database connection
const dbURI = process.env.DB_URI
const PORT = process.env.PORT || 3000
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));

  
// routes
app.use('/auth', authRoutes);
app.use('/user', requireAuth, userRoutes);
app.use('/blogs', requireAuth, blogRoutes);