"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenSocket = exports.verifyToken = void 0;
const dotEnv_utilities_1 = require("./dotEnv.utilities");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: "acceso denegado" });
    }
    try {
        const verificar = jwt.verify(token, dotEnv_utilities_1.fraseSecreta);
        var dataEnviada = req.body;
        ((req.body["data"] = dataEnviada), (req.body["user"] = verificar)), next();
    }
    catch (error) {
        return res.status(400).json({ error: "acceso denegado" });
    }
};
exports.verifyToken = verifyToken;
const verifyTokenSocket = (token) => {
    if (!token) {
        return false;
    }
    try {
        const verificar = jwt.verify(token, dotEnv_utilities_1.fraseSecreta);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.verifyTokenSocket = verifyTokenSocket;
