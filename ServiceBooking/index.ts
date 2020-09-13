import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import WebhookRequest from "../webhookTrans/webhook-request";
import IntentHandler from "./intent-handler";
import {constant} from "../sharedConstant/constant"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const webhookRequest = new WebhookRequest(req.body);
   
    const intentHandler = new IntentHandler(webhookRequest, context)
    
    if (webhookRequest != undefined) {
        
        var subaction =  webhookRequest.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) == null ? (webhookRequest.getParameterFromContext('subaction', constant.serviceModule.SKILL_CONTEXT) == null ? webhookRequest.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) : webhookRequest.getParameterFromContext('subaction', constant.serviceModule.SKILL_CONTEXT)) : webhookRequest.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT)
        //Show message
        let confidence=webhookRequest.getConfidence();
        let action=webhookRequest.getActionName();
        let visitor=webhookRequest.getVisitorInfoSalesIQRequest();

        if (webhookRequest.getIntent().isFallback) {

            const isFallback = await intentHandler.getFallbackMsg(constant.serviceModule.WELCOME_CONTEXT)
            if (!isFallback) {
                sendResponse(intentHandler, context, constant.serviceModule.WELCOME_CONTEXT + "_fallback", 1)
                return
            }
        } else {
            intentHandler.updateParameterInOutputContext(constant.serviceModule.WELCOME_CONTEXT, 'fallbackCount', 0, 2)
        }

        
        if(subaction == "serviceModule"){          
            await intentHandler.getWelcomeMessage(subaction,visitor)
            intentHandler.updateParameterInOutputContext(constant.serviceModule.WELCOME_CONTEXT, 'subaction', null,'')
            sendResponse(intentHandler, context, 'Default_finalanswer', 1)
            return
        }else{            
                await intentHandler.getFallbackMessage(subaction)
                sendResponse(intentHandler, context, 'Default_finalanswer', 1)
                return
           }   
    }

};

function sendResponse(intentHandler, context, step, stepno = 0) {
    const response = intentHandler.generateResponse(step, stepno)
    
    context.res = {
        body: response
    }
    return
}

export default httpTrigger;
