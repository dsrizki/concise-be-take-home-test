const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      break;
    case 'SequelizeForeignKeyConstraintError':
      break;
    case 'SequelizeUniqueConstraintError':
      break;

    default:
      // 'Internal Server Error'
      break;
  }
};

module.exports = errorHandler;
