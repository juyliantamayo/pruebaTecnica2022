"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.io = void 0;
const express = __importStar(require("express"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
const mongoose_1 = __importDefault(require("mongoose"));
const Usuario_Routes_1 = __importDefault(require("./routes/Usuario.Routes"));
const Items_Routes_1 = __importDefault(require("./routes/Items.Routes"));
const Item_Controller_1 = require("./controller/Item.Controller");
const validateToke_1 = require("./utilities/validateToke");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = express.default();
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
app.use(express.urlencoded());
app.use("/usuarios", Usuario_Routes_1.default);
app.use("/items", Items_Routes_1.default);
const server = http.createServer(app);
exports.io = new socketio.Server(server, {
    cors: { methods: ["GET", "POST"], credentials: false },
    transports: ["websocket"],
    allowEIO3: true,
});
exports.io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});
exports.io.on("connect", (socket) => {
    socket.on("obtenerGaleria", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("algo");
        const respuesta = yield (0, Item_Controller_1.getItems)();
        exports.io.emit("itemGaleriaUpdate", respuesta);
    }));
    socket.on("itemCarritoUpdateListen", (data) => __awaiter(void 0, void 0, void 0, function* () {
        if ((0, validateToke_1.verifyTokenSocket)(data["token"])) {
            delete data["token"];
            exports.io.emit("itemCarritoUpdate", yield (0, Item_Controller_1.getItemsCarritobyUsuario)(data["id"]));
        }
    }));
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});
server.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongoose_1.default.connect("mongodb+srv://julian:lolopopo12A*DTO@cluster0.5a7cfhg.mongodb.net/?retryWrites=true&w=majority");
    console.log("Running at localhost:3000");
}));
/*
async function conectionDB() {
 
  console.log(db.connection.name);
}

async function getUsuarios() {
 
}
*/
