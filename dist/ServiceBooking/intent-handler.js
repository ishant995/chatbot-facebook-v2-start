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
const service_1 = require("./service");
const util_1 = require("./util");
const nodemailer = require("nodemailer");
class IntentHandler {
    constructor(request, context) {
        this.outputContext = [];
        this.skillContextName = constant_1.constant.serviceModule.SKILL_CONTEXT;
        this.gaTableCardheaders = [];
        this.gaTableCarditems = [];
        this.getWelcomeMessage = (action, visitor) => {
            let customername = '';
            let mailid = '';
            let city = '';
            if (visitor || visitor != null || visitor != undefined) {
                customername = visitor.name;
                mailid = visitor.email;
                city = visitor.city;
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let msg = "Mahindra Namaskar #customername! Welcome to MTBD chatbot. How can I be of assistance today?";
                try {
                    msg = "Mahindra Namaskar #customername! Welcome to MTBD chatbot. How can I be of assistance today?";
                    msg = msg.replace(/#customername/g, customername);
                    this.response.addDFMessage(new df_text_1.default(msg, webhook_response_1.PLATFORM.FACEBOOK));
                }
                catch (e) {
                    try {
                        msg = `Sorry, I may not be able to help you on this.`;
                        this.response.addDFMessage(new df_text_1.default(msg, webhook_response_1.PLATFORM.FACEBOOK));
                    }
                    catch (e) {
                    }
                }
                resolve();
            }));
        };
        this.getFallbackMsg = (skillname) => {
            let fallbackCount = this.request.getParameterFromContext('fallbackCount', skillname) || 0;
            var subaction = this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) == null ? (this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.SKILL_CONTEXT) == null ? this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) : this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.SKILL_CONTEXT)) : this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fallbackCount = parseInt(fallbackCount);
                fallbackCount++;
                this.updateParameterInOutputContext(skillname, 'fallbackCount', fallbackCount, 2);
                let msg = `Sorry I didn't understand.`;
                try {
                    if (subaction == undefined || subaction == null || subaction == "") {
                        msg = `Sorry, I may not be able to help you on this.`;
                    }
                    else {
                        msg = `Sorry I didn't understand. Can you please repharse to help me understand better.`;
                    }
                }
                catch (e) { }
                if (fallbackCount >= 3) {
                    let msg = `Please try again.`;
                    try {
                        msg = `Please try again.`;
                    }
                    catch (e) { }
                    try {
                        this.response.addDFMessage(new df_text_1.default(msg, webhook_response_1.PLATFORM.FACEBOOK), false, true, true);
                        this.updateParameterInOutputContext(skillname, 'fallbackCount', 0, 2);
                        this.clearSkillContexts(skillname);
                        resolve(false);
                        return;
                    }
                    catch (e) {
                        console.log(e);
                        return;
                    }
                }
                else {
                    this.response.addDFMessage(new df_text_1.default(msg, webhook_response_1.PLATFORM.FACEBOOK), false, true, true);
                    resolve(true);
                    return;
                }
            }));
        };
        this.getFallbackMessage = (action) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let msg = "Sorry, I'm not sure how to help with that, I'm learning more every day.";
                let URL = [];
                try {
                    msg = "Sorry, I'm not sure how to help with that, I'm learning more every day.";
                }
                catch (e) {
                    try {
                        msg = `Sorry, I may not be able to help you on this.`;
                    }
                    catch (e) {
                    }
                }
                this.response.addDFMessage(new df_text_1.default(msg, webhook_response_1.PLATFORM.FACEBOOK), false, true, true, false, false);
                if (URL && URL.length) {
                    this.response.addGoogleLinkOutSuggestion('Open link', URL[0]);
                }
                resolve();
            }));
        };
        this.addFollowupMessageAfterSkillEnds = () => __awaiter(this, void 0, void 0, function* () {
            let msg = `You can continue with following options.`;
            var subaction = this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) == null ? (this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.SKILL_CONTEXT) == null ? this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) : this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.SKILL_CONTEXT)) : this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT);
            try {
                msg = `Is there anything else I can assist with?`;
            }
            catch (e) { }
            this.response.addDFMessage(new df_text_1.default(msg, webhook_response_1.PLATFORM.FACEBOOK), false, true, true);
        });
        this.request = request;
        this.response = new webhook_response_1.default(request, this.skillContextName);
        this.context = context;
        this.service = new service_1.default();
        this.utils = new util_1.default();
    }
    sendOutputContextForOpenField(contextName, shouldClearContext = false) {
        let askOutputContext = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`);
        if (shouldClearContext) {
            if (askOutputContext) {
                askOutputContext.lifespanCount == 0;
            }
            else {
                this.outputContext.push({
                    name: `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`,
                    lifespanCount: 0,
                    parameters: {}
                });
            }
        }
        else {
            if (askOutputContext) {
                askOutputContext.lifespanCount = 2;
            }
            else {
                this.outputContext.push({
                    name: `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`,
                    lifespanCount: 1,
                    parameters: {}
                });
            }
        }
    }
    updateParameterInRequestOutputContext(paramName, value) {
        const skillContexts = this.request.getAllOutputContexts();
        skillContexts.forEach(context => {
            if (!context.parameters) {
                context.parameters = {};
            }
            context.parameters[paramName] = value;
        });
        this.request.setParameterValue(paramName, value);
        //Set Output context in current request
        this.request.setAllOutputContext(skillContexts);
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
    clearSkillContexts(skillContextName) {
        const Context = this.request.getOutputContextsByName(skillContextName);
        if (Context) {
            this.updateLifespanInOutputContext(skillContextName, 0);
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
        var subaction = this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) == null ? (this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.SKILL_CONTEXT) == null ? this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT) : this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT)) : this.request.getParameterFromContext('subaction', constant_1.constant.serviceModule.WELCOME_CONTEXT);
        let response = this.response.createResponse(this.outputContext);
        try {
            let visitor = this.request.getVisitorInfoSalesIQRequest();
            let customername = '';
            let mailid = '';
            let city = '';
            let mobileno = '';
            if (visitor || visitor != null || visitor != undefined) {
                customername = visitor.name;
                mailid = visitor.email;
                city = visitor.state + ' ' + visitor.city;
                mobileno = visitor.phone;
            }
        }
        catch (error) {
            console.log(error);
            console.log("Log Error");
        }
        return response;
    }
}
exports.default = IntentHandler;
//# sourceMappingURL=intent-handler.js.map