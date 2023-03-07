const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json({
        message: err.errors[0].message
      });
      break;
    case 'SequelizeForeignKeyConstraintError':
    // ...
    // break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({
        message: err.errors[0].message
      });
      break;
    case 'Error not found':
      res.status(404).json({
        message: err.name
      });
      break;
    default:
      console.log(err);
      res.status(500).json({
        message: err
        // message: 'Internal Server Error'
      });
      break;
  }
};

module.exports = errorHandler;
