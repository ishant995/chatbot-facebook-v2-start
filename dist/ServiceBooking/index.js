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
const webhook_request_1 = require("../webhookTrans/webhook-request");
const intent_handler_1 = require("./intent-handler");
const constant_1 = require("../sharedConstant/constant");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const webhookRequest = new webhook_request_1.default(req.body);
        const intentHandler = new intent_handler_1.default(webhookRequest, context);
        const confidencetocheck = 0.8;
        let isLocationPermissionDenied = false;
        if (webhookRequest != undefined) {
            var subaction = webhookRequest.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) == null ? (webhookRequest.getParameterFromContext('subaction', constant_1.constant.serviceModule.SKILL_CONTEXT) == null ? webhookRequest.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) : webhookRequest.getParameterFromContext('subaction', constant_1.constant.serviceModule.SKILL_CONTEXT)) : webhookRequest.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT);
            //Show message
            let confidence = webhookRequest.getConfidence();
            let action = webhookRequest.getActionName();
            let visitor = webhookRequest.getVisitorInfoSalesIQRequest();
            if (webhookRequest.getIntent().isFallback) {
                const isFallback = yield intentHandler.getFallbackMsg(constant_1.constant.serviceModule.WELCOME_CONTEXT);
                if (!isFallback) {
                    sendResponse(intentHandler, context, constant_1.constant.serviceModule.WELCOME_CONTEXT + "_fallback", 1);
                    return;
                }
            }
            else {
                intentHandler.updateParameterInOutputContext(constant_1.constant.serviceModule.WELCOME_CONTEXT, 'fallbackCount', 0, 2);
            }
            if (subaction == "welcome_serviceModule") {
                yield intentHandler.getWelcomeMessage(subaction, visitor);
                intentHandler.updateParameterInOutputContext(constant_1.constant.serviceModule.WELCOME_CONTEXT, 'subaction', null, '');
                sendResponse(intentHandler, context, 'Deafault_finalanswer', 1);
                return;
            }
            else {
                yield intentHandler.getFallbackMessage(subaction);
                sendResponse(intentHandler, context, 'Deafault_finalanswer', 1);
                return;
            }
        }
    });
};
function sendResponse(intentHandler, context, step, stepno = 0) {
    const response = intentHandler.generateResponse(step, stepno);
    context.res = {
        body: response
    };
    return;
}
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map