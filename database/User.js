const mongoose = require("mongoose");
const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const dbOperation = {
    async getAllUser() {
        const users = await User.find();
        return users;
    },

    async getOneUserById(userId) {
        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId)
        });
        return user;
    },

    async createNewUser(newUser) {
        const isExist = await User.findOne({ email: newUser.email });
        if (isExist) {
            throw {
                status: 400,
                message: `Another user already exists with the same email address: ${newUser.email}.`
            };
        }

        const user = new User({
            name: newUser.name,
            email: newUser.email,
            password: CryptoJS.AES.encrypt(
                newUser.password,
                SECRET_KEY
            ).toString()
        });
        const ref = await user.save();
        return ref;
    },

    async login(credentials) {
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
            throw {
                status: 400,
                message:
                    "Login failed.Please make sure you have entered correct email or password."
            };
        }

        const bytes = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (credentials.password === originalPassword) {
            const token = jwt.sign({ id: user._id,email: user.email }, SECRET_KEY);
            return { user, token };
        } else {
            throw {
                status: 401,
                message:
                    "Login failed.Make sure you have entered correct email or password"
            };
        }
    }
};

module.exports = dbOperation;
