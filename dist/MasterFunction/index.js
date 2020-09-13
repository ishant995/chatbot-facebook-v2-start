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
const intent_router_1 = require("./intent-router");
const intent_handler_1 = require("./intent-handler");
const constant_1 = require("./constant");
const axios = require('axios');
const webhook_request_1 = require("../webhookTrans/webhook-request");
/**
 * Responsibility: Route webhook requests to specific Azure Functions based on action name
 *
 * @param {Context} context
 * @param {HttpRequest} req
 * @returns {Promise<void>}
 */
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const webhookRequest = new webhook_request_1.default(req.body);
        const intentHandler = new intent_handler_1.default(webhookRequest, context);
        let action = req.body.queryResult.action;
        let masteraction = req.body.queryResult.action;
        let intentRouter = new intent_router_1.default(context, req);
        let skillcontextMap = new Map();
        skillcontextMap.set('servicebooking-followup', 'service_booking');
        skillcontextMap.set('servicebookingstatus-followup', 'service_booking_status');
        let actionMap = new Map();
        actionMap.set(constant_1.default.FUNCTIONS.SERVICE_BOOKING.action, intentRouter.serviceBooking);
        //CHECK FOR ACTIVE VEHICLE START
        /*var vehiclemodel = webhookRequest.getParameterByName('Vehicle')  || webhookRequest.getParameterFromContext('Vehicle', constant.PRICECONSTANT.WELCOME_CONTEXT) || webhookRequest.getParameterFromContext('ContextVehicle', constant.PRICECONSTANT.WELCOME_CONTEXT)
        let isinactive=sdb.chkVehicleActiveorNot(vehiclemodel)
        if(isinactive){
            action='inactive';
            await intentHandler.getInactiveActionMessage('inactivevehiclemessage');
    
        }*/
        try {
            let response = sendResponse(intentHandler, context, 'Deafault_InactiveVehicle', 1);
            context.res = {
                status: 200,
                body: response
            };
        }
        catch (e) {
            context.res = e;
        }
    });
};
function sendResponse(intentHandler, context, step, stepno = 0) {
    const response = intentHandler.generateResponse(step, stepno);
    return response;
}
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map