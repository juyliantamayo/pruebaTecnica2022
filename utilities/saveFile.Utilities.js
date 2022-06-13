"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = void 0;
const fs = require("fs");
const saveFile = (data, path) => {
    fs.writeFile(path, data, (error) => {
        console.log(error);
    });
};
exports.saveFile = saveFile;
