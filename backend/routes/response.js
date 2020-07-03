const sendSuccess = (resp, data = {}) => {
  let responseData = {
    success: true,
    message: "Successful",
    ...data,
  };
  console.log("sending success response with code 200");
  console.log(responseData);
  resp.writeHead(200, {
    "Content-Type": "application/json",
  });
  resp.end(JSON.stringify(responseData));
};

/**
 * creates and sends the no content response, No content messages are header only messages. hence only status code is sent to caller.
 only, this won't be sent to caller
 */
const sendNoContent = (resp, data = {}) => {
  let responseData = {
    success: true,
    message: "No Content",
    ...data,
  };
  console.log("sending No Content response with code 204");
  console.log(responseData);
  resp.writeHead(204, {
    "Content-Type": "application/json",
  });
  resp.end(JSON.stringify(responseData));
};

/**
 * creates and sends the Authentication failure response, with success: false and message: "The username or password you entered is incorrect.",
 * you can customize the message by sending it in data (second argument).
 */
const sendAuthenticationFailure = (resp, data = {}) => {
  console.log("sending Authentication Failure with code 401", data);
  resp.writeHead(401, {
    "Content-Type": "application/json",
  });
  resp.end(
    JSON.stringify({
      success: false,
      message: "The username or password you entered is incorrect.",
      ...data,
    })
  );
};

/**
 * creates and sends the Authorization failure response, with success: false and message: "User is not authorized to perform this action",
 * you can customize the message by sending it in data (second argument).
 */
const sendAuthorizationFailure = (resp, data = {}) => {
  console.log("sending Authorization Failure with code 403", data);
  resp.writeHead(403, {
    "Content-Type": "application/json",
  });
  resp.end(
    JSON.stringify({
      success: false,
      message: "User is not authorized to perform this action",
      ...data,
    })
  );
};

/**
 * creates and sends the Internal server error response, with success: false and message: "Internal Server Error",
 * you can customize the message by sending it in data (second argument).
 */
const sendInternalServerError = (resp, data = {}) => {
  console.log("sending Internal server error with code 500", data);
  resp.writeHead(500, {
    "Content-Type": "application/json",
  });
  resp.end(
    JSON.stringify({
      success: false,
      message: "Internal Server Error",
      ...data,
    })
  );
};

/**
 * creates and sends the Bad request response, with success: false and message: "Bad Request",
 * you can customize the message by sending it in data (second argument).
 */
const sendBadRequest = (resp, data = {}) => {
  console.log("sending Bad Request with error code 400", data);
  resp.writeHead(400, {
    "Content-Type": "application/json",
  });
  resp.end(
    JSON.stringify({
      success: false,
      message: "Bad Request",
      ...data,
    })
  );
};

/**
 * creates and sends the Resource conflict response, with success: false and message: "Resource Conflict",
 * you can customize the message by sending it in data (second argument).
 */
const sendResourceConflictFailure = (resp, data = {}) => {
  console.log("sending Bad Request with error code 400", data);
  resp.writeHead(409, {
    "Content-Type": "application/json",
  });
  resp.end(
    JSON.stringify({
      success: false,
      message: "Resource Conflict",
      ...data,
    })
  );
};

/**
 * handles the response object according to status code defined in "result.code", if no code defined in result object;
 */
const responseHandler = (resp, result = {}) => {
  switch (result.code) {
    case 200:
      sendSuccess(resp, result.data);
      break;
    case 204:
      sendNoContent(resp, result.data);
      break;
    case 400:
      sendBadRequest(resp);
      break;
    case 401:
      sendAuthenticationFailure(resp);
      break;
    case 403:
      sendAuthorizationFailure(resp);
      break;
    case 500:
      sendInternalServerError(resp);
      break;
    case 409:
      sendResourceConflictFailure(resp);
      break;
    default:
      sendInternalServerError(resp, {
        reason: "default",
      });
  }
};

module.exports = {
  sendSuccess,
  sendAuthenticationFailure,
  sendAuthorizationFailure,
  sendInternalServerError,
  sendBadRequest,
  responseHandler,
};
