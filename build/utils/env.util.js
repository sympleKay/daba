"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_CLOUD_UPLOAD_PRESET = exports.CLOUDINARY_CLOUD_SECRET = exports.CLOUDINARY_CLOUD_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.HASH_KEY = exports.HASH_ALGORITHM = exports.DB_NAME = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PROTOCOL = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT;
exports.DB_PROTOCOL = process.env.DB_PROTOCOL;
exports.DB_USER = process.env.DB_USER;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_NAME = process.env.DB_NAME;
exports.HASH_ALGORITHM = process.env.HASH_ALGORITHM;
exports.HASH_KEY = process.env.HASH_KEY;
exports.CLOUDINARY_CLOUD_NAME = process.env
    .CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_CLOUD_KEY = process.env
    .CLOUDINARY_CLOUD_KEY;
exports.CLOUDINARY_CLOUD_SECRET = process.env
    .CLOUDINARY_CLOUD_SECRET;
exports.CLOUDINARY_CLOUD_UPLOAD_PRESET = process.env
    .CLOUDINARY_CLOUD_UPLOAD_PRESET;
