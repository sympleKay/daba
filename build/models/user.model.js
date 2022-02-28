"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = (0, mongoose_1.model)("User", new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        length: 50,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        length: 50,
    },
    fullName: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
    },
    bio: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
}));
