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
const supertest_1 = __importDefault(require("supertest"));
// import { app } from "../app";
const server_1 = require("../server");
const student_service_1 = require("../modules/student/student.service");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const studentData = {
    name: "Mezba",
    email: "mezbani@mail.com",
    age: 35,
};
// const app = createServer();
describe("Student", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoDbMemoryServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoDbMemoryServer.getUri();
        yield mongoose_1.default.connect(uri);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    // it("should return 404 for an unknown email", async () => {
    //   const email = "unknown@mail.com";
    //   await supertest(app).get(`/api/v1/student/${email}`).expect(404);
    // });
    describe("GET SINGLE STUDENT", () => {
        it("should return 404 if unknown email is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const email = "unknown@gmail.com";
            const { statusCode, body } = yield (0, supertest_1.default)(server_1.app).get(`/api/v1/student/${email}`);
            expect(statusCode).toBe(404);
        }));
        it("should return correct student for email", () => __awaiter(void 0, void 0, void 0, function* () {
            const student = yield student_service_1.StudentService.createStudent(studentData);
            const { statusCode, body } = yield (0, supertest_1.default)(server_1.app).get(`/api/v1/student/${student === null || student === void 0 ? void 0 : student.email}`);
            // expect(statusCode).toBe(200);
            expect(body.data.email).toBe(student === null || student === void 0 ? void 0 : student.email);
        }));
    });
});
