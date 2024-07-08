const jwt = require("jsonwebtoken");
const config = Object.assign({}, global.gConfig);
const apiResponse = require("../utils/apiResponse");

module.exports = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, config.jwtConfig.JWT_SECRET_KEY);
      if (decodedToken) {
        req.userContext = {
          userId: decodedToken.userId,
        };
        next();
      }
    } else {
      return apiResponse.serverErrorResponse(res, "Token is empty");
    }
  } catch (error) {
    console.log("error", error);
    if (error.message == "jwt expired") {
      return apiResponse.serverErrorResponse(
        res,
        "Token has been expired, refrest the token or login again"
      );
    } else {
      return apiResponse.serverErrorResponse(
        res,
        "You are unauthorized to make this request"
      );
    }
  }
};
