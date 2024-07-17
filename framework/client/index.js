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
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("../../application/App"));
const client_2 = require("../mock-server/client");
const cachingFetch_1 = require("../../caching-fetch-library/cachingFetch");
const startClient = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, client_2.startMswClient)();
    // If there is initial data, use it to initialize the cache, then clean up
    if (typeof window.__INITIAL_DATA__ === 'string') {
        (0, cachingFetch_1.initializeCache)(window.__INITIAL_DATA__);
        delete window.__INITIAL_DATA__;
    }
    const domNode = document.getElementById('app');
    if (!domNode)
        throw new Error('No app element found');
    (0, client_1.hydrateRoot)(domNode, react_1.default.createElement(App_1.default, null));
});
startClient();
