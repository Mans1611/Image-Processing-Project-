import app from "../app";
import api from "../routes/api";
import supertest from 'supertest';
import express from 'express'
import { basename } from "path";


app.use("/api", api);

const request = supertest(app);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("Testing api File",()=>{
    it("first test for api end point",async()=>{
        const res = await request.get('/image?filename=gand&width=4ld40&height=401');
        expect(res.status).toBe(200);
    })
})