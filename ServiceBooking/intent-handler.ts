import { Context } from "@azure/functions";
import { constant } from "../sharedConstant/constant";
import DFQuickReplies from "../webhookTrans/responses/df-quickreplies";
import DFQuickRepliesInput from "../webhookTrans/responses/df-quickrepliesinput";
import DFText from "../webhookTrans/responses/df-text";
import { GoogleTableCardsHeader, GoogleTableCardsItem } from "../webhookTrans/responses/webhook-payload";
import WebhookRequest, { IOutputContext } from "../webhookTrans/webhook-request";
import WebhookResponse, { PLATFORM } from "../webhookTrans/webhook-response";
import Service from "./service";
import Utils from "./util";
import _ = require("lodash");
import * as moment from 'moment';
import { SalesIQPayload } from "../webhookTrans/responses/zoho-responses";
import { stringify } from "querystring";
const nodemailer = require("nodemailer")

export default class IntentHandler {
    protected request: WebhookRequest;
    public response: WebhookResponse
    protected context: Context
    apiresult: any;
    private currentContext: IOutputContext;
    public outputContext: IOutputContext[] = []
    public skillContextName = constant.serviceModule.SKILL_CONTEXT
    public service: Service;
    protected utils: Utils;
    public gaTableCardheaders: GoogleTableCardsHeader[] = []
    public gaTableCarditems: GoogleTableCardsItem[] = []
    constructor(request: WebhookRequest, context: Context) {
        this.request = request
        this.response = new WebhookResponse(request,this.skillContextName)
        this.context = context
        this.service = new Service();
        this.utils = new Utils()
    }

    getWelcomeMessage=(action,visitor)=>{
        let customername='';
        let mailid='';
        let city='';
        if(visitor || visitor != null || visitor != undefined){
            customername=visitor.name;
            mailid=visitor.email
            city=visitor.city
        }
        return new Promise(async (resolve, reject) => {
        let msg:any="Mahindra Namaskar #customername! Welcome to MTBD chatbot. How can I be of assistance today?";
        try{
            msg = "Mahindra Namaskar #customername! Welcome to MTBD chatbot. How can I be of assistance today?"
            msg = msg.replace(/#customername/g, customername)
            this.response.addDFMessage(new DFText(msg, PLATFORM.FACEBOOK));
        }
        catch(e){
            try{
                msg = `Sorry, I may not be able to help you on this.`
                this.response.addDFMessage(new DFText(msg, PLATFORM.FACEBOOK));
            }
            catch(e){

            }
        }
        resolve()
        })
    }


    getFallbackMsg = (skillname) => {
        let fallbackCount = this.request.getParameterFromContext('fallbackCount', skillname) || 0
        var subaction =  this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) == null ? (this.request.getParameterFromContext('subaction', constant.serviceModule.SKILL_CONTEXT) == null ? this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) : this.request.getParameterFromContext('subaction', constant.serviceModule.SKILL_CONTEXT)) : this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT)
        return new Promise(async (resolve, reject) => {

            fallbackCount = parseInt(fallbackCount)
            fallbackCount++;
            this.updateParameterInOutputContext(skillname, 'fallbackCount', fallbackCount, 2)
            let msg: any = `Sorry I didn't understand.`
            try {
                if(subaction == undefined || subaction == null || subaction == ""){
                msg = `Sorry, I may not be able to help you on this.`
                }
                else{
                msg = `Sorry I didn't understand. Can you please repharse to help me understand better.`
                }
            } catch (e) { }
            if (fallbackCount >= 3) {

                let msg: any = `Please try again.`
                try {
                    msg = `Please try again.`
                } catch (e) { }
                try{
                this.response.addDFMessage(new DFText(msg, PLATFORM.FACEBOOK), false, true, true);
                this.updateParameterInOutputContext(skillname, 'fallbackCount', 0, 2)

                this.clearSkillContexts(skillname)
                resolve(false)
                return
                }
                catch (e) {
                    console.log(e);
                    return
                 }
            } else {
                this.response.addDFMessage(new DFText(msg, PLATFORM.FACEBOOK), false, true, true);
                resolve(true)
                return
            }
        })
    }

    
    getFallbackMessage = (action) =>{
        return new Promise(async (resolve, reject) => {
                let msg: any="Sorry, I'm not sure how to help with that, I'm learning more every day."
                let URL = []
                try {
                msg = "Sorry, I'm not sure how to help with that, I'm learning more every day."           
                } catch (e) { 
                    try{
                        msg = `Sorry, I may not be able to help you on this.`
                    }
                    catch(e){

                    }
                }
            this.response.addDFMessage(new DFText(msg, PLATFORM.FACEBOOK),false,true,true,false,false);
            if (URL && URL.length) {
                this.response.addGoogleLinkOutSuggestion('Open link', URL[0])
            }
            resolve()
        })
    }

    sendOutputContextForOpenField(contextName, shouldClearContext = false) {

        let askOutputContext = this.outputContext.find(a => a.name == `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`)

        if (shouldClearContext) {
            if (askOutputContext) {
                askOutputContext.lifespanCount == 0
            } else {
                this.outputContext.push({
                    name: `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`,
                    lifespanCount: 0,
                    parameters: {}
                })
            }
        } else {
            if (askOutputContext) {
                askOutputContext.lifespanCount = 2
            } else {
                this.outputContext.push({
                    name: `${this.request.getSessionId()}/contexts/${contextName.toLowerCase()}`,
                    lifespanCount: 1,
                    parameters: {}
                })
            }
        }
    }

    updateParameterInRequestOutputContext(paramName, value) {
        const skillContexts: IOutputContext[] = this.request.getAllOutputContexts()

        skillContexts.forEach(context => {
            if(!context.parameters){
                context.parameters={}
            }
            context.parameters[paramName] = value
        });

        this.request.setParameterValue(paramName, value)
        //Set Output context in current request
        this.request.setAllOutputContext(skillContexts)
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
                    let msg: any = `You can continue with following options.`
                    var subaction =  this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) == null ? (this.request.getParameterFromContext('subaction', constant.serviceModule.SKILL_CONTEXT) == null ? this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) : this.request.getParameterFromContext('subaction', constant.serviceModule.SKILL_CONTEXT)) : this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT)
                    try {
                            msg = `Is there anything else I can assist with?`
                    } catch (e) { }
                    this.response.addDFMessage(new DFText(msg, PLATFORM.FACEBOOK), false, true, true);
         }


    clearSkillContexts(skillContextName) {
        const Context: IOutputContext = this.request.getOutputContextsByName(skillContextName)
        if (Context) {
            this.updateLifespanInOutputContext(skillContextName,0)
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
        var subaction =  this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) == null ? (this.request.getParameterFromContext('subaction', constant.serviceModule.SKILL_CONTEXT) == null ? this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT) : this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT)) : this.request.getParameterFromContext('subaction', constant.serviceModule.WELCOME_CONTEXT)
        let response: any = this.response.createResponse(this.outputContext)
        try{
            let visitor=this.request.getVisitorInfoSalesIQRequest();
            let customername='';
            let mailid='';
            let city='';
            let mobileno='';
            if(visitor || visitor != null || visitor != undefined){
                customername=visitor.name;
                mailid=visitor.email
                city=visitor.state+' '+visitor.city
                mobileno=visitor.phone
            }
        }catch(error){
            console.log(error);
            console.log("Log Error");
        }
        return response
    }
}