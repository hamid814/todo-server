const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    maeesage: err.message || 'server error'
  })
}

module.exports = errorHandler