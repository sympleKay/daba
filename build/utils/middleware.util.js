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
exports.AuthMiddlewareService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_util_1 = require("./env.util");
class AuthMiddlewareService {
    static Auth(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const _token = token === null || token === void 0 ? void 0 : token.split(" ")[1];
            if (!_token) {
                throw new Error("Invalid token");
            }
            const encryptedData = _token.split("_$");
            const iv = Buffer.from(encryptedData[2], "hex");
            const encryptText = Buffer.from(encryptedData[1], "hex");
            const secretKey = crypto_1.default.scryptSync(env_util_1.HASH_KEY, "salt", 32);
            const decipher = crypto_1.default.createDecipheriv(env_util_1.HASH_ALGORITHM, secretKey, iv);
            let decrypted = decipher.update(encryptText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            const tokenBearer = decrypted.toString();
            return tokenBearer;
        });
    }
    static verifyToken(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const privateKey = fs_1.default.readFileSync(path_1.default.resolve("./jwt-key"));
            const verify = jsonwebtoken_1.default.verify(jwtToken, privateKey);
            if (verify) {
                return verify;
            }
            else {
                return new Error("Invalid token provided");
            }
        });
    }
}
exports.AuthMiddlewareService = AuthMiddlewareService;
