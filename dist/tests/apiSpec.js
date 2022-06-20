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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(app_1.default);
describe("Testing api File", () => {
    // it("image proccessed", async ():Promise<void> => {
    //   const res = await request.get(
    //     "/api/image?filename=gand&width=440&height=417"
    //   );
    //   expect(res.status).toBe(201);
    // });
    describe("testing the not valid cases", () => {
        it("entering a string to the dimensions which is not valid ", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get("/api/image?filename=image&width=44l0&height=417");
            expect(res.status).toBe(401); // for a bad request
        }));
        it("entering file which is not exist ", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get("/api/image?filename=i1ma&width=440&height=417");
            expect(res.status).toBe(404); // for a NotFound
        }));
    });
});
