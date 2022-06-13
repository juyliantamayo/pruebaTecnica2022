"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usuario_Controller_1 = require("../controller/Usuario.Controller");
const validateToke_1 = require("../utilities/validateToke");
var routes = express_1.default.Router();
routes.get("/", validateToke_1.verifyToken, Usuario_Controller_1.getUsuarios);
routes.post("/", Usuario_Controller_1.createUsuario);
routes.post("/login", Usuario_Controller_1.loginUser);
routes.put("/", validateToke_1.verifyToken, Usuario_Controller_1.updateUsuario);
routes.delete("/", validateToke_1.verifyToken, Usuario_Controller_1.deleteUsuario);
exports.default = routes;
