import { Context } from "@azure/functions";
import { constant } from "../sharedConstant/constant";
import DFQuickReplies from "../webhookTrans/responses/df-quickreplies";
import DFText from "../webhookTrans/responses/df-text";
import { GoogleTableCardsHeader, GoogleTableCardsItem } from "../webhookTrans/responses/webhook-payload";
import WebhookRequest, { IOutputContext } from "../webhookTrans/webhook-request";
import WebhookResponse, { PLATFORM } from "../webhookTrans/webhook-response";
import _ = require("lodash");
import { sendFallbackMail} from '../webhookTrans/shared-utils';
export default class IntentHandler {
    protected request: WebhookRequest;
    public response: WebhookResponse
    protected context: Context
    protected priceapiresponse;
    apiresult: any;
    private currentContext: IOutputContext;
    public outputContext: IOutputContext[] = []
    public dbmessage: boolean = false;
    public skillContextName = constant.serviceModule.WELCOME_CONTEXT
    public isgoogleAs: boolean = false
    public gaTableCardheaders: GoogleTableCardsHeader[] = []
    public gaTableCarditems: GoogleTableCardsItem[] = []
    constructor(request: WebhookRequest, context: Context) {
        this.request = request
        this.response = new WebhookResponse(request,this.skillContextName)
        this.context = context      
    }
    
    updateParameterInOutputContext(contextName, paramName, value, lifespan) {
        let skillContext: IOutputContext = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName}`)
        if (skillContext) {
            skillContext.parameters[paramName] = value
        } else {
            let skillRequestContext = this.request.getOutputContextsByName(contextName)
            let parameters: any = {}

            if (skillRequestContext) {
                parameters = skillRequestContext.parameters || {}
                lifespan = skillRequestContext.lifespanCount
            } else {
                skillRequestContext = {
                    name: `${this.request.getSessionId()}/contexts/${contextName}`,
                    lifespanCount: lifespan,
                    parameters: parameters
                }
            }
            parameters[paramName] = value
            skillRequestContext.parameters = parameters
            skillRequestContext.lifespanCount = lifespan
            this.outputContext.push(skillRequestContext)
        }
    }

    /**
     * Update parameter name in request output context
     * @param {string} paramName
     * @param {*} value
     * @memberof IntentHandler
     */
    updateParameterInRequestOutputContext(paramName, value) {
        //get all request output contexts
        const testdriveContexts: IOutputContext[] = this.request.getAllOutputContexts()

        testdriveContexts.forEach(context => {
            //create blank paramters where paramters object is not avaialable
            if (!context.parameters) {
                context.parameters = {}
            }
            //update given value in parameter object
            context.parameters[paramName] = value
        });

        //Set parameter value in request query parameters
        this.request.setParameterValue(paramName, value)
        //Set Output context in current request
        this.request.setAllOutputContext(testdriveContexts)
    }

    updateLifespanInOutputContext(contextName,lifespan) {
        let skillContext: IOutputContext = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`)
        if (skillContext) {
            skillContext.lifespanCount = lifespan
        } else {
            this.outputContext.push({
                name: `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`,
                lifespanCount:lifespan,
                parameters: {}
            })
        }
    }

    addFollowupMessageAfterSkillEnds = async () => {
           if(!this.request.isWhatsappRequest())
           {
                let msg: any = `You can continue with following options.`
                try {
                    msg = `You can continue with following options.`
                } catch (e) { }
                this.response.addDFMessage(new DFText(msg, PLATFORM.FACEBOOK), false, false, false);
            }        
        }


    clearSkillContexts() {
        const Context: IOutputContext = this.request.getOutputContextsByName(this.skillContextName)
        if (Context) {
            this.updateLifespanInOutputContext(this.skillContextName,0)
        }
    }

    clearOutputContextByName(contextName) {
        const context = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName}`)
        if (context) {
            context.lifespanCount = 0
        } else {
            this.outputContext.push({
                name: `${this.request.getSessionId()}/contexts/${contextName}`,
                lifespanCount: 0,
                parameters: {}
            })
        }
    }

    generateResponse(step,stepno) {
        let response: any = this.response.createResponse(this.outputContext)
        //SAVE TO LOG
        try {
            
        }
        catch (error) {
            console.log("Log Error");
        }
        //SAVE TO LOG
        return response
    }

}