const errorHandler = (err, req, res, next) => {
  console.log(err)
  if(err.name == 'ValidationError') {
    err.message = Object.values(err.errors).map(val => val.message);

    console.log(err.message)
  }
  
  if(err.code === 11000) {
    err.status = 400;
    err.maeeage = 'Duplicate field value entered'
  }
  
  res.status(err.status || 500).json({
    success: false,
    maeesage: err.message || 'server error'
  })
}

module.exports = errorHandler