"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inazuma Eleven Simulator API',
            version: '1.0.0',
            description: 'API documentation for the Inazuma Eleven Simulator',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://11sim.netlify.app',
                description: 'Production server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
