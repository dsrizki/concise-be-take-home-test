const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json({
        message: err.errors[0].message
      });
      break;
    // case 'SequelizeForeignKeyConstraintError':
    //   // ...
    //   res.status(400).json({
    //     message: err
    //   });
    //   break;
    case 'user_id cannot be deleted or NULL on table task':
      res.status(400).json({
        message: 'This user is doing another task(s)!'
      });
      break;
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
    case 'Empty | NULL user_id':
      res.status(400).json({
        message: 'user_id is required'
      });
      break;
    case 'user_id not found':
      res.status(400).json({
        message: err.name
      });
      break;
    default:
      console.log(err.name);
      res.status(500).json({
        message: 'Internal Server Error'
      });
      break;
  }
};

module.exports = errorHandler;
