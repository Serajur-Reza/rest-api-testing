import supertest from "supertest";
// import { app } from "../app";
import { app } from "../server";
import { StudentService } from "../modules/student/student.service";

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const studentData = {
  name: "Mezba",
  email: "mezbani@mail.com",
  age: 35,
};

// const app = createServer();

describe("Student", () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create();

    const uri = mongoDbMemoryServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  // it("should return 404 for an unknown email", async () => {
  //   const email = "unknown@mail.com";
  //   await supertest(app).get(`/api/v1/student/${email}`).expect(404);
  // });
  describe("GET SINGLE STUDENT", () => {
    it("should return 404 if unknown email is provided", async () => {
      const email = "unknown@gmail.com";
      const { statusCode, body } = await supertest(app).get(
        `/api/v1/student/${email}`
      );

      expect(statusCode).toBe(404);
    });

    it("should return correct student for email", async () => {
      const student = await StudentService.createStudent(studentData);

      const { statusCode, body } = await supertest(app).get(
        `/api/v1/student/${student?.email}`
      );

      // expect(statusCode).toBe(200);
      expect(body.data.email).toBe(student?.email);
    });
  });
});
