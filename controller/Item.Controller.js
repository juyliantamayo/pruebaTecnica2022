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
exports.comprarItemVenta = exports.insertItemVenta = exports.getItemsCarritoByUsuarioRest = exports.getItemsVentabyUsuario = exports.getItemsCarritobyUsuario = exports.comprarItem = exports.saveItemsVenta = exports.getItems = void 0;
const __1 = require("..");
const Item_1 = require("../models/Item");
const Usuario_1 = __importDefault(require("./../models/Usuario"));
const getItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.find({}, { itemsVenta: 1 });
    return usuarios;
});
exports.getItems = getItems;
const saveItemsVenta = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    let pivot = yield Usuario_1.default.findById(id);
    var item = data[0];
    console.log(data);
    let respuesta = yield Usuario_1.default.findById(id);
    let items = respuesta === null || respuesta === void 0 ? void 0 : respuesta.itemsVenta;
    items === null || items === void 0 ? void 0 : items.push(item);
    console.log(items);
    const respuestaFinal = yield Usuario_1.default.findByIdAndUpdate(id, {
        itemsVenta: items,
    });
    return respuestaFinal;
});
exports.saveItemsVenta = saveItemsVenta;
const comprarItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const idComprador = data["idComprador"];
    const idVendedor = data["idVendedor"];
    const idItem = data["itemId"];
    console.log(data);
    var itemCompraod = new Item_1.Item();
    let usuarioVendedor = yield Usuario_1.default.findOne({
        _id: idVendedor,
    });
    let itemvenetaPivot = usuarioVendedor === null || usuarioVendedor === void 0 ? void 0 : usuarioVendedor.itemsVenta;
    itemvenetaPivot === null || itemvenetaPivot === void 0 ? void 0 : itemvenetaPivot.forEach((item) => {
        if (item.itemId.toString() == idItem) {
            itemCompraod = item;
            item.cantidad -= data.cantidad;
        }
    });
    itemCompraod.cantidad = data.cantidad;
    yield (usuarioVendedor === null || usuarioVendedor === void 0 ? void 0 : usuarioVendedor.save());
    let usuarioComprador = yield Usuario_1.default.findById(idComprador);
    let itemCompraPivot = usuarioComprador === null || usuarioComprador === void 0 ? void 0 : usuarioComprador.itemsCarrito;
    let encontrado = false;
    itemCompraPivot === null || itemCompraPivot === void 0 ? void 0 : itemCompraPivot.forEach((item) => {
        if (item.itemId.toString() == idItem) {
            encontrado = true;
            item.cantidad += data.cantidad;
        }
    });
    if (!encontrado) {
        itemCompraPivot === null || itemCompraPivot === void 0 ? void 0 : itemCompraPivot.push(itemCompraod);
    }
    yield (usuarioComprador === null || usuarioComprador === void 0 ? void 0 : usuarioComprador.save());
});
exports.comprarItem = comprarItem;
const getItemsCarritobyUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.findById(id, {
        itemsCarrito: 1,
    });
    return usuarios;
});
exports.getItemsCarritobyUsuario = getItemsCarritobyUsuario;
const getItemsVentabyUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.findById(id, {
        itemsVenta: 1,
    });
    return usuarios;
});
exports.getItemsVentabyUsuario = getItemsVentabyUsuario;
const getItemsCarritoByUsuarioRest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario_1.default.findById(req.query["id"], {
        itemsCarrito: 1,
    });
    res.send(usuarios);
});
exports.getItemsCarritoByUsuarioRest = getItemsCarritoByUsuarioRest;
const insertItemVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.saveItemsVenta)(JSON.parse(req.body["data"]["itemsVenta"]), req.body["data"]["id"]);
    const respuesta = yield (0, exports.getItems)();
    __1.io.emit("itemGaleriaUpdate", respuesta);
    res.send(respuesta);
});
exports.insertItemVenta = insertItemVenta;
const comprarItemVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.comprarItem)(req.body["data"]);
    const respuesta = yield (0, exports.getItems)();
    __1.io.emit("itemVentaUpdate", yield (0, exports.getItemsVentabyUsuario)(req.body["data"]["idVendedor"]));
    __1.io.emit("itemCarritoUpdate", yield (0, exports.getItemsCarritobyUsuario)(req.body["data"]["idComprador"]));
    __1.io.emit("itemGaleriaUpdate", yield (0, exports.getItems)());
    res.send(respuesta);
});
exports.comprarItemVenta = comprarItemVenta;
