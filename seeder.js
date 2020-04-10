const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Todo = require('./models/Todo');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read fade database files
const todos = require('./db/todos');
const users = require('./db/users');

// Import into DB
const importData = async () => {
  try {
    await Todo.create(todos);
    await User.create(users);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Todo.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// delet all users
const deletUsers = async () => {
  try {
    await User.deleteMany();
    console.log('Users Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err)
  }
}

// delete all todos
const deletTodos = async () => {
  try {
    await Todo.deleteMany();
    console.log('Todos Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else if(process.argv[2] === '-deleteusers') {
  deletUsers();
} else if(process.argv[2] === '-deletetodos') {
  deletTodos();
}