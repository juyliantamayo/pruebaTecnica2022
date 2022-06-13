"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const Item_1 = require("./Item");
class Usuario {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "correo", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, minlength: 6 }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasena", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Item_1.Item }),
    __metadata("design:type", Array)
], Usuario.prototype, "itemsVenta", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Item_1.Item }),
    __metadata("design:type", Array)
], Usuario.prototype, "itemsCarrito", void 0);
__decorate([
    (0, typegoose_1.prop)({ rtype: () => Item_1.Item }),
    __metadata("design:type", Array)
], Usuario.prototype, "itemsCompraHistorial", void 0);
const UsuarioModel = (0, typegoose_1.getModelForClass)(Usuario);
exports.default = UsuarioModel;
