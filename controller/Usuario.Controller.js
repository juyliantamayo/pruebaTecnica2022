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
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.loginUser = exports.getUsuarios = void 0;
const Usuario_1 = __importDefault(require("./../models/Usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotEnv_utilities_1 = require("../utilities/dotEnv.utilities");
const jwt = require("jsonwebtoken");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.find();
    res.send(usuarios);
});
exports.getUsuarios = getUsuarios;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Usuario_1.default.findOne({
        correo: req.body["correo"],
    });
    if (usuario == null) {
        return res.status(400).send({ error: "El usuario no existe" });
    }
    if (!(yield bcrypt_1.default.compare(req.body["contrasena"], usuario.contrasena))) {
        return res.status(400).send({ error: "contraseña incorrecta" });
    }
    const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, correo: usuario.correo }, dotEnv_utilities_1.fraseSecreta);
    res.header("auth-token", token).send({
        token: token,
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        apellido: usuario.apellido,
    });
});
exports.loginUser = loginUser;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = new Usuario_1.default(req.body);
        usuario.contrasena = yield bcrypt_1.default.hash(usuario.contrasena, yield bcrypt_1.default.genSalt(10));
        const validacion = yield usuario.validate();
        const respuesta = yield usuario.save();
        res.send(respuesta);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createUsuario = createUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body["id"];
    delete req.body["id"];
    const respuesta = yield Usuario_1.default.findByIdAndUpdate(id, {
        itemsVenta: req.body.itemsVenta,
    });
    res.send(respuesta);
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body["id"];
    delete req.body["id"];
    const respuesta = yield Usuario_1.default.findByIdAndRemove(id);
    res.send(respuesta);
});
exports.deleteUsuario = deleteUsuario;
