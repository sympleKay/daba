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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.currentUser = exports.login = exports.register = void 0;
const service_util_1 = require("../utils/service.util");
const register = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield service_util_1.UserAuthService.registerUser(args);
    return res;
});
exports.register = register;
const login = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield service_util_1.UserAuthService.loginUser(args);
    return res;
});
exports.login = login;
const currentUser = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield service_util_1.UserAuthService.currentUser(context);
    return res;
});
exports.currentUser = currentUser;
const update = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield service_util_1.UserAuthService.updateUser(args, context);
    return res;
});
exports.update = update;
