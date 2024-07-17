"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const cachingFetch_1 = require("../caching-fetch-library/cachingFetch");
const validation_1 = require("./validation");
const Name = ({ index }) => {
    // We are intentionally passing down the index prop to the Name component
    // To simulate the useCachingFetch hook being used in different locations
    const { data: rawData, isLoading, error, } = (0, cachingFetch_1.useCachingFetch)('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole&seed=123');
    if (isLoading)
        return react_1.default.createElement("div", null, "Loading...");
    if (error || rawData === null)
        return react_1.default.createElement("div", null,
            "Error: ", error === null || error === void 0 ? void 0 :
            error.message);
    const data = (0, validation_1.validateData)(rawData);
    const person = data[index];
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null,
            person.first,
            " ",
            person.last)));
};
exports.default = Name;
