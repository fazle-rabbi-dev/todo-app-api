const Todo = require("../../database/Todo");

const todoService = {
    async getAllTodo(userId) {
        try {
            const allTodo = await Todo.getAllTodo(userId)
            return allTodo;
        } catch (error) {
            throw error;
        }
    },

    async getOneTodoById(todoId, userId) {
        try {
            const todo = await Todo.getOneTodoById(todoId, userId)
            return todo;
        } catch (error) {
            if(error.custom){
                throw error;
                return;
            }
            
            throw {
                status: 400,
                message: "Make sure you have entered correct todoId"
            };
        }
    },

    async createNewTodo(newTodo, userId) {
        try {
            const todo = await Todo.createNewTodo(newTodo)
            return todo;
        } catch (error) {
            throw error;
        }
    },
    
    /* Pending... */
    async updateTodo() {},

    async deleteTodo() {}
};

module.exports = todoService;
