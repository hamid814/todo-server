const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler')
// Route files
const todos = require('./routes/todos')
const auth = require('./routes/auth')

// Init App
const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Body parser
app.use(express.json({ extended: false }))

// log reqs
app.use(morgan('dev'));

// Add static files
app.use(express.static('public'));

// routes
app.use('/api/todos', todos);
app.use('/api/auth', auth);

// Custom error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray)})