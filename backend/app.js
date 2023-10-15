const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = 8000;
dotenv.config();

const movieRouter = require('./routes/movie');
const { postToken } = require('./middleware/authenticateToken');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// route movie
app.use('/api/movies', movieRouter);

// Handling non matching request from the client
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});
app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
