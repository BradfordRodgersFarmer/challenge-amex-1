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
const App_1 = __importDefault(require("../../application/App"));
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const cachingFetch_1 = require("../../caching-fetch-library/cachingFetch");
const renderApp = (loadDataInServer) => __awaiter(void 0, void 0, void 0, function* () {
    // If the App has provided a preLoadServerData, call it, then acquire the cache to send to the browser
    let initialData;
    if (loadDataInServer && typeof App_1.default.preLoadServerData === 'function') {
        yield App_1.default.preLoadServerData();
        initialData = (0, cachingFetch_1.serializeCache)();
    }
    return [server_1.default.renderToString(react_1.default.createElement(App_1.default, null)), initialData];
});
exports.default = renderApp;
