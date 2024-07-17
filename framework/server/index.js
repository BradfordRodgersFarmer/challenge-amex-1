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
const fastify_1 = __importDefault(require("fastify"));
const buildHtmlDoc_1 = __importDefault(require("./buildHtmlDoc"));
const renderApp_1 = __importDefault(require("./renderApp"));
const fs = __importStar(require("fs"));
const server_1 = require("../mock-server/server");
const cachingFetch_1 = require("../../caching-fetch-library/cachingFetch");
const runServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // start the msw server
    yield (0, server_1.startMswServer)();
    const fastify = (0, fastify_1.default)({
        logger: true,
    });
    // serve the framwork runtime
    const clientJs = fs.readFileSync('./dist/client.js');
    fastify.get('/client.js', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.header('content-type', 'text/javascript').send(clientJs);
    }));
    // serve the service worker for msw to work in the browser
    const mswJs = fs.readFileSync('./dist/mockServiceWorker.js');
    fastify.get('/mockServiceWorker.js', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.header('content-type', 'text/javascript').send(mswJs);
    }));
    // serve a static landing page to provide links to the two versions of the app
    fastify.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply
            .header('content-type', 'text/html')
            .send((0, buildHtmlDoc_1.default)([
            `<h1>Welcome to the People Directory</h1><p>Visit <a href="/appWithSSRData">/appWithSSRData</a> to see data loaded on the server</p><p>Visit <a href="/appWithoutSSRData">/appWithoutSSRData</a> to see data loaded on the client</p>`,
        ], false));
    }));
    // serve the application, with data loader on the server
    fastify.get('/appWithSSRData', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        (0, cachingFetch_1.wipeCache)();
        reply
            .header('content-type', 'text/html')
            .send((0, buildHtmlDoc_1.default)(yield (0, renderApp_1.default)(true)));
    }));
    // serve the application, without data loader on the server
    fastify.get('/appWithoutSSRData', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        (0, cachingFetch_1.wipeCache)();
        reply
            .header('content-type', 'text/html')
            .send((0, buildHtmlDoc_1.default)(yield (0, renderApp_1.default)(false)));
    }));
    fastify.listen({ port: 3000 }, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        console.log(`Server is now listening on ${address}`);
    });
});
runServer();
