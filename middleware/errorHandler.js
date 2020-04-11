const errorHandler = (err, req, res, next) => {
  console.log(err)
  if(err.name == 'ValidationError') {
    err.message = Object.values(err.errors).map(val => val.message);
    err.status = 400;
  }
  
  if(err.code === 11000) {
    console.log('here')
    err.status = 400;
    err.message = 'Duplicate field value entered';
  }
  
  res.status(err.status || 500).json({
    success: false,
    message: String(err.message) || 'server error'
  })
}

module.exports = errorHandler