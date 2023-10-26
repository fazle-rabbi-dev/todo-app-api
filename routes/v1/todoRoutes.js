const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/v1/todoController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.get("/", authMiddleware, todoController.getAllTodo);
router.get("/:todoId", authMiddleware, todoController.getOneTodoById);
router.post("/", authMiddleware, todoController.createNewTodo);
router.patch("/:todoId", authMiddleware, todoController.updateTodo);
router.delete("/:todoId", authMiddleware, todoController.deleteTodo);

module.exports = router;
