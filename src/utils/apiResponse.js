exports.successResponseWithNoData = function (res, msg) {
  var data = {
    code: 200,
    status: "Success",
    message: msg,
    result: [],
  };
  return res.status(200).json(data);
};
exports.successResponseWithData = function (res, msg, data) {
  var data = {
    code: 200,
    status: "Success",
    message: msg,
    result: data,
  };
  return res.status(200).json(data);
};
exports.notFound = function (res, msg) {
  var data = {
    code: 404,
    status: "Fail",
    message: msg ? msg : "Not Found",
  };
  return res.status(404).json(data);
};
exports.badRequest = function (res, msg) {
  var data = {
    code: 400,
    status: "Fail",
    message: msg ? msg : "Bad Request",
  };
  return res.status(404).json(data);
};
exports.serverErrorResponse = function (res, msg, data) {
  var data = {
    code: 500,
    status: "Fail",
    message: msg ? msg : "Internal Server Error",
  };
  return res.status(500).json(data);
};
exports.unAuthorizedResponse = function (res, msg, data) {
  var data = {
    code: 401,
    status: "Fail",
    message: msg,
  };
  return res.status(401).json(data);
};
