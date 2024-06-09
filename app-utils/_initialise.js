const configFile = require("../config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

let config = null;

exports.initialize = (app, callback) => {
  configFile.createConfig((err) => {
    if (err) {
      callback(err);
    } else {
      config = Object.assign({}, global.gConfig);
      require("../src/connections/mysql");

      app.use(bodyParser.json({ limit: "50mb" }));
      app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

      app.use(cookieParser(""));

      app.use(cors({ origin: true, credentials: true }));

      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        if (req.method === "OPTIONS") {
          return res.status(200).end();
        } else {
          next();
        }
      });
      app.use(require("../src/routers/index"));
      callback(null);
    }
  });
};
