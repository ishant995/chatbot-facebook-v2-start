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
const constant_1 = require("../sharedConstant/constant");
const df_text_1 = require("../webhookTrans/responses/df-text");
const webhook_response_1 = require("../webhookTrans/webhook-response");
class IntentHandler {
    constructor(request, context) {
        this.outputContext = [];
        this.dbmessage = false;
        this.skillContextName = constant_1.constant.serviceModule.WELCOME_CONTEXT;
        this.isgoogleAs = false;
        this.gaTableCardheaders = [];
        this.gaTableCarditems = [];
        this.addFollowupMessageAfterSkillEnds = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.request.isWhatsappRequest()) {
                let msg = `You can continue with following options.`;
                try {
                    msg = `You can continue with following options.`;
                }
                catch (e) { }
                this.response.addDFMessage(new df_text_1.default(msg, webhook_response_1.PLATFORM.FACEBOOK), false, false, false);
            }
        });
        this.request = request;
        this.response = new webhook_response_1.default(request, this.skillContextName);
        this.context = context;
    }
    updateParameterInOutputContext(contextName, paramName, value, lifespan) {
        let skillContext = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName}`);
        if (skillContext) {
            skillContext.parameters[paramName] = value;
        }
        else {
            let skillRequestContext = this.request.getOutputContextsByName(contextName);
            let parameters = {};
            if (skillRequestContext) {
                parameters = skillRequestContext.parameters || {};
                lifespan = skillRequestContext.lifespanCount;
            }
            else {
                skillRequestContext = {
                    name: `${this.request.getSessionId()}/contexts/${contextName}`,
                    lifespanCount: lifespan,
                    parameters: parameters
                };
            }
            parameters[paramName] = value;
            skillRequestContext.parameters = parameters;
            skillRequestContext.lifespanCount = lifespan;
            this.outputContext.push(skillRequestContext);
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
        const testdriveContexts = this.request.getAllOutputContexts();
        testdriveContexts.forEach(context => {
            //create blank paramters where paramters object is not avaialable
            if (!context.parameters) {
                context.parameters = {};
            }
            //update given value in parameter object
            context.parameters[paramName] = value;
        });
        //Set parameter value in request query parameters
        this.request.setParameterValue(paramName, value);
        //Set Output context in current request
        this.request.setAllOutputContext(testdriveContexts);
    }
    updateLifespanInOutputContext(contextName, lifespan) {
        let skillContext = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`);
        if (skillContext) {
            skillContext.lifespanCount = lifespan;
        }
        else {
            this.outputContext.push({
                name: `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`,
                lifespanCount: lifespan,
                parameters: {}
            });
        }
    }
    clearSkillContexts() {
        const Context = this.request.getOutputContextsByName(this.skillContextName);
        if (Context) {
            this.updateLifespanInOutputContext(this.skillContextName, 0);
        }
    }
    clearOutputContextByName(contextName) {
        const context = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName}`);
        if (context) {
            context.lifespanCount = 0;
        }
        else {
            this.outputContext.push({
                name: `${this.request.getSessionId()}/contexts/${contextName}`,
                lifespanCount: 0,
                parameters: {}
            });
        }
    }
    generateResponse(step, stepno) {
        let response = this.response.createResponse(this.outputContext);
        //SAVE TO LOG
        try {
        }
        catch (error) {
            console.log("Log Error");
        }
        //SAVE TO LOG
        return response;
    }
}
exports.default = IntentHandler;
//# sourceMappingURL=intent-handler.js.map