"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    // Handle the error and send an appropriate response
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal Server Error',
        errorMessages: [
            {
                path: req.originalUrl,
                message: err.message, // Send the error message to the client
            },
        ],
    });
};
exports.default = globalErrorHandler;
