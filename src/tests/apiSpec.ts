import app from "../app";
import supertest from "supertest";

const request = supertest(app);

describe("Testing api File", () => {
  it("image proccessed", async () => {
    const res = await request.get(
      "/api/image?filename=image&width=440&height=417"
    );
    expect(res.status).toBe(201);
  });
  describe("testing the not valid cases", () => {
    it("entering a string to the dimensions which is not valid ", async () => {
      const res = await request.get(
        "/api/image?filename=image&width=44l0&height=417"
      );
      expect(res.status).toBe(401); // for a bad request
    });

    it("entering file which is not exist ", async () => {
      const res = await request.get(
        "/api/image?filename=i1ma&width=440&height=417"
      );
      expect(res.status).toBe(404); // for a NotFound
    });
  });
});
