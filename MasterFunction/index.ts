import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import ACTION_NAMES from './constant'
import IntentRouter from "./intent-router";
import IntentHandler from "./intent-handler";
import Constant from "./constant"
import { constant } from "../sharedConstant/constant"
const axios = require('axios');
import WebhookRequest, { IOutputContext } from "../webhookTrans/webhook-request";
/**
 * Responsibility: Route webhook requests to specific Azure Functions based on action name
 *
 * @param {Context} context
 * @param {HttpRequest} req
 * @returns {Promise<void>}
 */
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const webhookRequest = new WebhookRequest(req.body);
    const intentHandler = new IntentHandler(webhookRequest, context)
    let action = req.body.queryResult.action
    let masteraction = req.body.queryResult.action
    let intentRouter = new IntentRouter(context, req)
    let skillcontextMap = new Map();
    skillcontextMap.set('servicebooking-followup','service_booking')
    skillcontextMap.set('servicebookingstatus-followup','service_booking_status')
    let actionMap = new Map();
    
    actionMap.set(Constant.FUNCTIONS.SERVICE_BOOKING.action, intentRouter.serviceBooking)

    //CHECK FOR ACTIVE VEHICLE START
    /*var vehiclemodel = webhookRequest.getParameterByName('Vehicle')  || webhookRequest.getParameterFromContext('Vehicle', constant.PRICECONSTANT.WELCOME_CONTEXT) || webhookRequest.getParameterFromContext('ContextVehicle', constant.PRICECONSTANT.WELCOME_CONTEXT)
    let isinactive=sdb.chkVehicleActiveorNot(vehiclemodel)
    if(isinactive){
        action='inactive';
        await intentHandler.getInactiveActionMessage('inactivevehiclemessage');

    }*/
        try{
        let response=sendResponse(intentHandler, context, 'Deafault_InactiveVehicle', 1);

        context.res = {
            status: 200, 
            body: response
        };
        }   
        catch(e){
            context.res = e
        }
    
};

function sendResponse(intentHandler, context, step, stepno = 0) {
    const response = intentHandler.generateResponse(step, stepno)
    return response;
}
export default httpTrigger;
