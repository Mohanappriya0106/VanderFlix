import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

const validId = "695610baadf6f42fa1031171"; // existing test document

describe("Backend Integration — Experiences API", () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("GET /api/v1/experiences — should return paginated envelope", async () => {
    const res = await request(app).get("/api/v1/experiences");
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data.items");
    expect(Array.isArray(res.body.data.items)).toBe(true);
  });

  test("GET /api/v1/experiences/:id — unknown but valid ObjectId → 404 envelope, no crash", async () => {
    const res = await request(app).get("/api/v1/experiences/aaaaaaaaaaaaaaaaaaaaaaaa");
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  test("GET /api/v1/experiences/:id — real existing document", async () => {
    const res = await request(app).get(`/api/v1/experiences/${validId}`);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Test");
  });

  test("POST /api/v1/clicks/track — invalid ID → 400 validation envelope", async () => {
    const res = await request(app)
      .post("/api/v1/clicks/track")
      .send({ experienceId: "BAD_ID", type: "Gear", platform: "Amazon" });

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  test("GET /api/v1/clicks/platform-stats — should aggregate click counts", async () => {
    const res = await request(app).get("/api/v1/clicks/platform-stats");
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty("clicks");
  });

  test("GET /api/v1/clicks/experience-stats — should return top experiences with lookup", async () => {
    const res = await request(app).get("/api/v1/clicks/experience-stats");
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty("title");
    expect(res.body.data[0]).toHaveProperty("location");
  });

});
