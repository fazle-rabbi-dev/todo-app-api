const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: "description.."
    },
    status: {
        type: String,
        default: "pending"
    },
    priority: {
        type: String,
        default: "normal"
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    dueDate: {
        type: Date,
        default: null
    },
    createdAt: {
        immutable: true,
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
        default: null
    }
});

module.exports = todoSchema;
