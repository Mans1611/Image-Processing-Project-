import app from "../app";
import supertest from "supertest";

const request = supertest(app);

describe("testing api end point", () => {
  it("test not getting an error ", async ():Promise<void> => {
    const res = await request.get("/api/image");
    expect(res.status).toBe(200);
  });
});
