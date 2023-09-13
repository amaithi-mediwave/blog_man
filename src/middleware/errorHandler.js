

let constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  NO_CONTENT: 204,
};

//------------------------------------------------------
//          CUSTOM ERROR HANDLER
//------------------------------------------------------

const errorHandler = (err, req, res, next) => {
  
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        // stackTrace: err.stack,
      });

    case constants.UNAUTHORISED:
      res.json({
        title: "Un-Authorised",
        message: err.message,
        // stackTrace: err.stack,
      });

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden or In-Valid Format",
        message: err.message,
        // stackTrace: err.stack,
      });

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        // stackTrace: err.stack,
      });
      
      case constants.NO_CONTENT:
      res.json({
        title: "Content Not Exists",
        message: err.message,
        // stackTrace: err.stack,
      });
    default:
      console.log("No Error all good");
      res.status(422).json({
        title: "Unable to process the request",
        message: "Request Contains Semantic errors, and the Server can’t process it",
        // message: err.message,
    });
  }
};

// MODULE EXPORTS
module.exports = errorHandler;
