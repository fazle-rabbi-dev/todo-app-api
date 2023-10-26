const userService = require("../../services/v1/userService");

const userController = {
    getAllUser: async (req, res) => {
        try {
            const users = await userService.getAllUser();
            res.status(200).json({
                data: {
                    users
                }
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                data: {
                    status: "Failed",
                    message: error?.message || error
                }
            });
        }
    },

    getOneUserById: async (req, res) => {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                data: {
                    status: "Failed",
                    message:
                        "Maybe you forgot to specify the following query parameter in request url: userId. e.g: /api/v1/users/userId<String>"
                }
            });
        }

        try {
            const user = await userService.getOneUserById(userId);
            res.status(200).json({
                data: {
                    user
                }
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                data: {
                    status: "Failed",
                    message: error?.message || error
                }
            });
        }
    },

    createNewUser: async (req, res) => {
        const { body } = req;
        if (!body.name || !body.email || !body.password) {
            res.status(400).json({
                status: "Failed",
                data: {
                    message:
                        "Signup failed due to missing or empty the following keys in request body: (name, email, password)"
                }
            });
            return;
        }

        try {
            /* TODO: required input validation */
            const newUser = {
                name: body.name,
                email: body.email,
                password: body.password
            };

            const user = await userService.createNewUser(newUser);
            res.status(201).json({
                status: "Success",
                data: {
                    message: "New user created successful",
                    user
                }
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                status: "Failed",
                message: error?.message || error
            });
        }
    },

    login: async (req, res) => {
        const { body } = req;
        if (!body.email || !body.password) {
            res.status(400).json({
                status: "Failed",
                data: {
                    message:
                        "Login failed due to missing or empty the following keys in request body: (email, password)"
                }
            });
            return;
        }

        try {
            const { user, token } = await userService.login(req.body);
            res.status(200).json({
                status: "Success",
                data: {
                    message: "Logged in successful",
                    user,
                    token
                }
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                status: "Failed",
                message: error?.message || error
            });
        }
    }
};

module.exports = userController;
