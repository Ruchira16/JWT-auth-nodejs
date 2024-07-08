const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const validateToken = require("../middlewares/validateToken");

router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/createDefaultUser", loginController.createDefaultUser);
router.get("/getUser", validateToken, loginController.getUsers);
module.exports = router;
