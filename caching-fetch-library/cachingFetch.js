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
exports.wipeCache = exports.initializeCache = exports.serializeCache = exports.preloadCachingFetch = exports.useCachingFetch = void 0;
// You may edit this file, add new files to support this file,
// and/or add new dependencies to the project as you see fit.
// However, you must not change the surface API presented from this file,
// and you should not need to change any other files in the project to complete the challenge
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const swr_1 = __importDefault(require("swr"));
const fetcher = (url) => fetch(url).then((res) => res.json());
const setCache = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(url);
        if (data.body === null)
            throw new Error('No data');
        const dataToSave = yield data.json();
        myCache.set(url, JSON.stringify(dataToSave));
        return true;
    }
    catch (e) {
        myCache.set(url, null);
        myCache.set(url + 'error', e);
        return true;
    }
});
/**
 * 1. Implement a caching fetch hook. The hook should return an object with the following properties:
 * - isLoading: a boolean that is true when the fetch is in progress and false otherwise
 * - data: the data returned from the fetch, or null if the fetch has not completed
 * - error: an error object if the fetch fails, or null if the fetch is successful
 *
 * This hook is called three times on the client:
 *  - 1 in App.tsx
 *  - 2 in Person.tsx
 *  - 3 in Name.tsx
 *
 * Acceptance Criteria:
 * 1. The application at /appWithoutSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should only see 1 network request in the browser's network tab when visiting the /appWithoutSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
const useCachingFetch = (url) => {
    const intialData = myCache.get(url);
    if (intialData) {
        const error = myCache.get(url + 'error');
        return { isLoading: false, data: JSON.parse(intialData), error };
    }
    const { data, error } = (0, swr_1.default)(url, fetcher, {
        fallbackData: null
    });
    if (data)
        myCache.set(url, JSON.stringify(data));
    return { isLoading: !data, data, error };
};
exports.useCachingFetch = useCachingFetch;
/**
 * 2. Implement a preloading caching fetch function. The function should fetch the data.
 *
 * This function will be called once on the server before any rendering occurs.
 *
 * Any subsequent call to useCachingFetch should result in the returned data being available immediately.
 * Meaning that the page should be completely serverside rendered on /appWithSSRData
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript disabled, you should see a list of people.
 * 2. You have not changed any code outside of this file to achieve this.
 * 3. This file passes a type-check.
 *
 */
const preloadCachingFetch = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield setCache(url);
    }
    catch (e) {
        myCache.set(url, null);
        myCache.set(url + 'error', e);
    }
});
exports.preloadCachingFetch = preloadCachingFetch;
/**
 * 3.1 Implement a serializeCache function that serializes the cache to a string.
 * 3.2 Implement an initializeCache function that initializes the cache from a serialized cache string.
 *
 * Together, these two functions will help the framework transfer your cache to the browser.
 *
 * The framework will call `serializeCache` on the server to serialize the cache to a string and inject it into the dom.
 * The framework will then call `initializeCache` on the browser with the serialized cache string to initialize the cache.
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should not see any network calls to the people API when visiting the /appWithSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
const serializeCache = () => {
    const keys = myCache.keys();
    return keys.map((key) => `${key}:${myCache.get(key)}`).join(',');
};
exports.serializeCache = serializeCache;
const initializeCache = (serializedCache) => {
    const keyValues = serializedCache.split(',');
    keyValues.forEach((keyValue) => {
        const [key, value] = keyValue.split(':');
        myCache.set(key, value);
    });
};
exports.initializeCache = initializeCache;
const wipeCache = () => {
    myCache.flushAll();
};
exports.wipeCache = wipeCache;
