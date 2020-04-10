const Todo = require('../models/Todo');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @route     GET /api/todos
// @desc      Get all todos
// @access    Private
exports.getTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user._id })

  res.status(200).json({
    success: true,
    count: todos.length,
    data: todos
  })
})

// @route     GET /api/todos/:id
// @desc      Get single todo with id
// @access    Private
exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id)

  if(!todo) {
    return next(
      new ErrorResponse(404, `no todo found with id ${req.params.id}`)
    )
  }

  if(String(todo.user) !== String(req.user._id)) {
    return next(
      new ErrorResponse(401, `user is not allowed to see this todo`)
    )
  }

  res.status(200).json({
    success: true,
    data: todo
  })
})

// @route     POST /api/todos
// @desc      Add todo
// @access    Private
exports.addTodo = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id
  
  const todo = await Todo.create(req.body)

  res.status(201).json({
    success: true,
    data: todo
  })
})

// @route     PUT /api/todos/:id
// @desc      update todo
// @access    Private
exports.updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id)

  if(!todo) {
    return next(
      new ErrorResponse(404, `no todo found with id ${req.params.id}`)
    )
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(201).json({
    success: true,
    data: todo
  })
})

// @route     DELETE /api/todos/:id
// @desc      Delete todo
// @access    Private
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id)

  if(!todo) {
    return next(
      new ErrorResponse(404, `no todo found with id ${req.params.id}`)
    )
  }

  await todo.remove()

  res.status(200).json({
    success: true,
    data: {}
  })
})
