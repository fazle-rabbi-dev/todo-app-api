const Todo = require("../models/TodoModel");
const mongoose = require("mongoose");

const dbOperation = {
    async getAllTodo(userId) {
        const allTodo = await Todo.find({
            author: userId
        });
        return allTodo;
    },

    async getOneTodoById(todoId, userId) {
        const todo = await Todo.findOne({
            _id: todoId,
            author: userId
        });

        if (!todo) {
            throw {
                custom: true,
                status: 404,
                message: "No todo found."
            };
        }

        return todo;
    },

    async createNewTodo(newTodo, userId) {
        const { title, desc, priority, dueDate } = newTodo;
        const todoObject = {
            title,
            author: new mongoose.Types.ObjectId(userId)
        };

        if (desc) {
            todoObject.desc = desc;
        }
        if (priority) {
            todoObject.priority = priority;
        }
        if (dueDate) {
            todoObject.dueDate = dueDate;
        }
        const todo = new Todo(todoObject);
        const ref = await todo.save();
        return ref;
    }

    /* Pending... */
    // Update
    // Delete
};

module.exports = dbOperation;
