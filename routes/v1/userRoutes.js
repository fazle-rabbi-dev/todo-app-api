const express = require("express");
const router = express.Router();
const userController = require("../../controllers/v1/userController");

router.get("/", userController.getAllUser);
router.get("/:userId", userController.getOneUserById);
router.post("/signup", userController.createNewUser);
router.post("/login", userController.login);

module.exports = router;
