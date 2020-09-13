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
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const axios = require('axios');
/**
 * Contains network calls for skill specific functions
 *
 * @class IntentRouter
 */
class IntentRouter {
    constructor(ctx, req) {
        this.serviceBooking = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios.post(constant_1.default.FUNCTIONS.SERVICE_BOOKING.functionURL, this.req.body)
                    .then((response) => {
                    resolve(response);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
        this.ctx = ctx;
        this.req = req;
    }
}
exports.default = IntentRouter;
//# sourceMappingURL=intent-router.js.map