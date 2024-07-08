const express = require("express");
const router = express.Router();

const loginRoute = require("./login");

router.use("/auth", loginRoute);

module.exports = router;
