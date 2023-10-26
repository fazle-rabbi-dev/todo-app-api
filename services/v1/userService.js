const User = require("../../database/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const userService = {
    async getAllUser() {
        try {
            const users = await User.getAllUser();
            return users;
        } catch (error) {
            throw error;
        }
    },

    async getOneUserById(userId) {
        try {
            const user = await User.getOneUserById(userId);
            return user;
        } catch (error) {
            throw {
                status: 400,
                message:
                    "Looks like you are trying to fetch a user who are not exists in our database.Make sure you have entered correct userId"
            };
        }
    },

    async createNewUser(newUser) {
        try {
            const user = await User.createNewUser(newUser);
            return user;
        } catch (error) {
            throw error;
        }
    },

    async login(credentials) {
        try {
            const user = await User.login(credentials);
            return user;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = userService;
