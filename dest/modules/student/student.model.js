"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: String,
});
// creating the model
const Student = (0, mongoose_1.model)('Student', studentSchema);
exports.default = Student;
