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
const api_1 = __importDefault(require("../routes/api"));
const supertest_1 = __importDefault(require("supertest"));
app_1.default.use("/api", api_1.default);
const request = (0, supertest_1.default)(app_1.default);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
describe("Testing api File", () => {
    it("first test for api end point", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/image?filename=gand&width=4ld40&height=401');
        expect(res.status).toBe(200);
    }));
});
