"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../controllers/auth.js");
const router = express_1.default.Router();
router.post('/register', auth_js_1.register);
router.post('/login', auth_js_1.login);
// router.post('/logout', logout)
// router.post('/refresh', refresh)
exports.default = router;
