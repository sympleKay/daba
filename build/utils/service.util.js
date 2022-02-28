"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("cloudinary");
const user_model_1 = require("../models/user.model");
const env_util_1 = require("../utils/env.util");
const middleware_util_1 = require("../utils/middleware.util");
cloudinary_1.v2.config({
    cloud_name: env_util_1.CLOUDINARY_CLOUD_NAME,
    api_key: env_util_1.CLOUDINARY_CLOUD_KEY,
    api_secret: env_util_1.CLOUDINARY_CLOUD_SECRET,
});
class UserAuthService {
    static registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email: data.email });
            if (user) {
                return new Error("User already exist");
            }
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashPassword = yield bcryptjs_1.default.hash(data.password, salt);
            let imageUrl;
            if (data.photo) {
                const image = yield cloudinary_1.v2.uploader.upload(data.photo, {
                    overwrite: true,
                });
                imageUrl = image.secure_url;
            }
            const newUser = new user_model_1.User({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: hashPassword,
                bio: data.bio,
                photo: imageUrl ? imageUrl : null,
                fullName: `${data.firstName} ${data.lastName}`,
            });
            const saveUser = yield newUser.save();
            if (saveUser) {
                return "User created succesfully";
            }
            return new Error("User account could not be created");
        });
    }
    static loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = data;
                const user = yield user_model_1.User.findOne({ email });
                if (!user) {
                    return new Error("Invalid Credentials");
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return new Error("Invalid Credentials");
                }
                const privateKey = fs_1.default.readFileSync(path_1.default.resolve("./jwt-key"));
                const token = jsonwebtoken_1.default.sign({
                    id: user._id,
                    email: user.email,
                }, Buffer.from(privateKey), { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 });
                const algorithm = env_util_1.HASH_ALGORITHM;
                const secretKey = crypto_1.default.scryptSync(env_util_1.HASH_KEY, "salt", 32);
                const iv = crypto_1.default.randomBytes(16);
                const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
                let encrypt = cipher.update(token);
                encrypt = Buffer.concat([encrypt, cipher.final()]);
                user.lastLogin = new Date(Date.now());
                yield user.save();
                return {
                    email: user.email,
                    accessToken: `daba_tech_key_$${encrypt.toString("hex")}_$${iv.toString("hex")}`,
                };
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
    static currentUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodeToken = yield middleware_util_1.AuthMiddlewareService.Auth(data.token);
                const auth = (yield middleware_util_1.AuthMiddlewareService.verifyToken(decodeToken));
                const user = (yield user_model_1.User.findById(auth.id));
                const currentUser = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    lastLogin: user.lastLogin,
                    fullName: user.fullName,
                    username: user.username,
                    bio: user.bio,
                    photo: user.photo,
                    password: user.password,
                    createdAt: user.createdAt,
                };
                return currentUser;
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
    static updateUser(data, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodeToken = yield middleware_util_1.AuthMiddlewareService.Auth(context.token);
                const auth = (yield middleware_util_1.AuthMiddlewareService.verifyToken(decodeToken));
                const user = yield user_model_1.User.findById(auth.id);
                if (!user) {
                    return new Error("User does not exist");
                }
                const { email, firstName, lastName, username, password, bio, photo } = data;
                const salt = bcryptjs_1.default.genSaltSync(10);
                let imageUrl;
                if (photo) {
                    const image = yield cloudinary_1.v2.uploader.upload(photo, {
                        overwrite: true,
                    });
                    imageUrl = image.secure_url;
                }
                user.firstName = firstName ? firstName : user.firstName;
                user.lastName = lastName ? lastName : user.lastName;
                user.email = email ? email : user.email;
                user.username = username ? username : user.username;
                user.photo = imageUrl ? imageUrl : user.photo;
                user.fullName =
                    firstName || lastName
                        ? `${firstName ? firstName : user.firstName} ${lastName ? lastName : user.lastName}`
                        : user.fullName;
                user.bio = bio ? bio : user.bio;
                user.password = password
                    ? yield bcryptjs_1.default.hash(password, salt)
                    : user.password;
                const saveUser = yield user.save();
                if (saveUser) {
                    return saveUser;
                }
                return new Error("User account could not be updated");
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
}
exports.UserAuthService = UserAuthService;
