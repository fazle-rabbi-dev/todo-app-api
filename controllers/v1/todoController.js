const todoService = require("../../services/v1/todoService");

const todoController = {
    async getAllTodo(req, res) {
        try {
            const allTodo = await todoService.getAllTodo(req.userId);
            res.status(200).json({
                status: "Success",
                data: {
                    todos: allTodo
                }
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                status: "Failed",
                message: error?.message || error
            });
        }
    },

    async getOneTodoById(req, res) {
        const { todoId } = req.params;
        
        try {
            const todo = await todoService.getOneTodoById(todoId, req.userId);
            res.status(200).json({
                status: "Success",
                todo
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                status: "Failed",
                message: error?.message || error
            });
        }
    },

    async createNewTodo(req, res) {
        const { body } = req;
        if (!body.title) {
            res.status(400).json({
                status: "Failed",
                message:
                    "Todo creation failed due to missing or empty 'title' key in the request body."
            });
            return;
        }

        try {
            const todo = await todoService.createNewTodo(req.body, req.userId);
            res.status(201).json({
                status: "Success",
                message: "New todo created successful",
                todo
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                status: "Failed",
                message: error?.message || error
            });
        }
    },
    
    /* Pending... */
    async updateTodo(req, res) {
        res.send("updateTodo");
    },

    async deleteTodo(req, res) {
        res.send("deleteTodo");
    }
};

module.exports = todoController;
