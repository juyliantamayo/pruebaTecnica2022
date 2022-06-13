"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Item_Controller_1 = require("../controller/Item.Controller");
const validateToke_1 = require("../utilities/validateToke");
var routes = express_1.default.Router();
routes.get("/getItemsCarritoByUsuario", validateToke_1.verifyToken, Item_Controller_1.getItemsCarritoByUsuarioRest);
routes.post("/insetItem", validateToke_1.verifyToken, Item_Controller_1.insertItemVenta);
routes.post("/comprarItem", validateToke_1.verifyToken, Item_Controller_1.comprarItemVenta);
exports.default = routes;
