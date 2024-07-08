const config = Object.assign({}, global.gConfig);
const typeorm = require("typeorm");
const path = require("path");

// Database configuration
var datasource = new typeorm.DataSource({
  type: "mysql",
  host: config.database.host,
  port: Number(config.database.port),
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: true,
  logging: true,
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  entities: [path.join(__dirname, "../entity/*.js")],
});

datasource
  .initialize()
  .then(function () {
    console.log("Database Connected!, ", config.database.name);
  })
  .catch(function (err) {
    console.log("Error: ", err);
  });

module.exports = datasource;
