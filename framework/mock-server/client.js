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
exports.startMswClient = void 0;
const browser_1 = require("msw/browser");
const handler_1 = require("./handler");
const startMswClient = () => __awaiter(void 0, void 0, void 0, function* () {
    const worker = (0, browser_1.setupWorker)(handler_1.handler);
    return worker.start();
});
exports.startMswClient = startMswClient;
