import * as jwt from 'jsonwebtoken';

/**
 * Webhook request class to get details from webhook request
*/
export default class WebhookRequest {
    request: IWebhookRequest;
    constructor(request: IWebhookRequest) {
        this.request = request
    }


    /**
     * @returns action 
     * @memberof WebhookRequest
     */
    getActionName() {
        return this.request.queryResult.action
    }

    /**
     * @private
     * @returns query parameters
     * @memberof WebhookRequest
     */
    private getAllParameters() {
        return this.request.queryResult.parameters || null
    }

    /**
     * Update parameter value in query parameters
     * @param {*} paramName
     * @param {*} value
     * @memberof WebhookRequest
     */
    setParameterValue(paramName, value) {
        this.request.queryResult.parameters[paramName] = value
    }

    /**
     * Get query parametr by name
     * @param {*} paramName
     * @returns
     * @memberof WebhookRequest
     */
    getParameterByName(paramName) {
        const allParams = this.getAllParameters()
        if (allParams) {
            return allParams[paramName]
        } else {
            return null
        }
    }

    getAllInputParameters(){
        return this.request.queryResult.parameters || null
    }

    /**
     * Get all output contexts
     * @returns 
     * @memberof WebhookRequest
     */
    getAllOutputContexts() {
        return this.request.queryResult.outputContexts || []
    }

    /**
     * Set all output contexts
     *
     * @param {*} outputContext
     * @memberof WebhookRequest
     */
    setAllOutputContext(outputContext: any) {
        this.request.queryResult.outputContexts = outputContext
    }


    /**
     * Get output context by name
     * @param {string} context_name
     * @returns
     * @memberof WebhookRequest
     */
    getOutputContextsByName(context_name: string) {
        const contextName = `${this.getSessionId()}/contexts/${context_name.toLowerCase()}`
        const context = this.getAllOutputContexts().find(a => a.name == contextName)
        return context
    }

    /**
     * Add output context in current output contexts
     * @param {*} context
     * @memberof WebhookRequest
     */
    addOutputContext(context) {
        const remainingContexts = this.getAllOutputContexts().filter(a => a.name != context.name)
        this.request.queryResult.outputContexts = remainingContexts
        this.request.queryResult.outputContexts.push(context)
    }


    /**
     * Update parameter in request output context
     * 
     * @param {*} context_name
     * @param {*} paramName
     * @param {*} value
     * @returns context
     * @memberof WebhookRequest
     */
    updateOutputContextParameter(context_name, paramName, value) {
        /**
         * Create context name
        */
        const contextName = `${this.getSessionId()}/contexts/${context_name}`

        /**
         * Search context by name in request output contexts
        */
        let context = this.getAllOutputContexts().find(a => a.name == contextName)

        /**
         * If context is not available then create a new context
        */
        if (!context) {
            context = {
                name: `${this.getSessionId()}/contexts/${context_name}`,
                lifespanCount: 20,
                parameters: {}
            }
        }

        /**
         *  Update parameter in context
        */
        context.parameters[paramName] = value

        /**
         * Add/Update context in current request context
        */
        const remainingContexts = this.getAllOutputContexts().filter(a => a.name != contextName)
        this.request.queryResult.outputContexts = remainingContexts
        this.request.queryResult.outputContexts.push(context)

        return context
    }

    /**
     * Get parameter value from context
     *
     * @param {*} paramName
     * @param {*} contextName
     * @returns
     * @memberof WebhookRequest
     */
    getParameterFromContext(paramName, contextName) {
        const context = this.getOutputContextsByName(contextName)
        if (context && context.parameters) {
            return context.parameters[paramName] === 0 && (!Array.isArray(context.parameters[paramName])) ? 0 : context.parameters[paramName] || null
        }
        return null
    }


    /**
     * Get Session ID
     *
     * @returns String
     * @memberof WebhookRequest
     */
    getSessionId() {
        return this.request.session
    }

    /**
     * Get Intent name
     *
     * @returns
     * @memberof WebhookRequest
     */
    getIntent() {
        return this.request.queryResult.intent
    }

    /**
     * Get language code  e.g. 'en','hi', 'en-in'
     *
     * @returns
     * @memberof WebhookRequest
     */
    getlanguageCode() {
        return this.request.queryResult.languageCode;
    }

    /**
     * Get user query
     *
     * @returns
     * @memberof WebhookRequest
     */
    getQueryText() {
        return this.request.queryResult.queryText   
    }

    /**
     * Get intent detection confidence
     *
     * @returns
     * @memberof WebhookRequest
     */
    getConfidence() {
        return this.request.queryResult.intentDetectionConfidence
    }

    /**
     * Get allRequiredParamsPresent flag
     *
     * @returns Boolean
     * @memberof WebhookRequest
     */
    isIntentFulfilled() {
        return this.request.queryResult.allRequiredParamsPresent || false
    }

    /**
     * Get request source. e.g. 'facebook','google'
     *
     * @returns string
     * @memberof WebhookRequest
     */
    getOriginalDetectIntentRequest() {
        return this.request.originalDetectIntentRequest ? this.request.originalDetectIntentRequest.source || false : false
    }

    /**
     * Custom method to check if request is from whatsapp.
     * 
     * @returns Boolean
     * @memberof WebhookRequest
     */
    isWhatsappRequest() {
        const context: any = this.getOutputContextsByName('welcomecontext')

        //If 'source' parameter is added as 'WHATSAPP' then return 'true'
        if (context && context.parameters && context.parameters.source == 'WHATSAPP') {
            return true
        }

    }

    /**
     * Check if the requested device has SCREEN_OUTPUT capability
     *
     * @returns Boolean
     * @memberof WebhookRequest
     */
    isScreenDevice() {
        if (this.getOriginalDetectIntentRequest() == "google") {
            return this.request.originalDetectIntentRequest.payload.surface.capabilities.find(a => a.name == 'actions.capability.SCREEN_OUTPUT') || false
        } else {
            return false
        }
    }



    /**
     * Get OPTION value from google assistance request
     * - Used for TD booking dealers list item click
     * @param {*} paramName
     * @returns
     * @memberof WebhookRequest
     */
    getOptionValueFromGoogleAssistanceRequest(paramName) {
        if (this.request.queryResult.parameters[paramName]) {
            if (!this.request.originalDetectIntentRequest.payload) {
                return null
            } else {
                // Get 'input' object from request where 'argument' name is 'OPTION'
                const input = this.request.originalDetectIntentRequest.payload.inputs.find(input => {
                    return input.arguments.find(argument => argument.name == 'OPTION')
                })

                //If 'input' is present return value
                if (input) {
                    return input.arguments[0].textValue || ""
                }
            }
        } else {
            return null
        }
    }


    /** 
     * Get PERMISSION value from google assistance request
     * - Used for getting GA and GH user location
     *
     * @param {boolean} [isOnlyNamePermission=false] // skip location details in this case
     * @returns {
                 isRejected: boolean,
                 userDetails: user profile object ,
                    locationDetails: {
                        lat: "",
                        lng:  "",
                        city: "",
                        address:""
                    }
                 }
     * @memberof WebhookRequest
     */
    getUserDetailsValueFromGoogleAssistancePermissionRequest(isOnlyNamePermission = false) {
        // 'Input' payload is present 
        if (this.request.originalDetectIntentRequest.payload && this.request.originalDetectIntentRequest.payload.inputs) {

            //Get input object where agument name is 'PERMISSION'
            const input = this.request.originalDetectIntentRequest.payload.inputs.find(input => {
                if (input.arguments) {
                    return input.arguments.find(argument => argument.name == 'PERMISSION')
                } else {
                    return null
                }
            })

            // If 'input' is not null
            if (input) {
                //If permission value is 'true'
                if (input.arguments[0].boolValue) {

                    // Return only user details if 'isOnlyNamePermission' flag is set
                    if (isOnlyNamePermission) {
                        return {
                            isRejected: false,
                            userDetails: this.request.originalDetectIntentRequest.payload.user ? this.request.originalDetectIntentRequest.payload.user.profile : null,
                            locationDetails: null
                        }
                    } else {
                        // If device object is available in request
                        if (this.request.originalDetectIntentRequest.payload.device) {
                            return {
                                isRejected: false,
                                userDetails: this.request.originalDetectIntentRequest.payload.user ? this.request.originalDetectIntentRequest.payload.user.profile : null,
                                locationDetails: {
                                    lat: this.request.originalDetectIntentRequest.payload.device.location.coordinates.latitude + "",
                                    lng: this.request.originalDetectIntentRequest.payload.device.location.coordinates.longitude + "",
                                    city: this.request.originalDetectIntentRequest.payload.device.location.city + "",
                                    address: this.request.originalDetectIntentRequest.payload.device.location.formattedAddress + ""
                                }
                            }
                        } else {
                            return { isRejected: false, userDetails: null, locationDetails: null }
                        }
                    }
                } else {
                    //return 'isRejected' true as permission was denied by user
                    return { isRejected: true, userDetails: null, locationDetails: null }
                }
            } else {
                return { isRejected: false, userDetails: null, locationDetails: null }
            }
        } else {
            return { isRejected: false, userDetails: null, locationDetails: null }
        }
    }



    /**
     * Get GA and GH sign in request status
     * @private
     * @returns {boolean}
     * @memberof WebhookRequest
     */
    private getSignInStatusFromGoogleAssistanceRequest() {
        // 'Input' payload is present 
        if (!this.request.originalDetectIntentRequest.payload) {
            return null
        } else {
            //Get input object where agument name is 'SIGN_IN'
            const input = this.request.originalDetectIntentRequest.payload.inputs.find(input => {
                return input.arguments.find(argument => argument.name == 'SIGN_IN')
            })

            // If 'input' is not null
            if (input) {
                // Get 'SIGN_IN' status 
                if (input.arguments[0].extension && input.arguments[0].extension.status) {
                    return input.arguments[0].extension.status //true
                } else {
                    return false
                }
            }
        }
    }

    /**
     * Get transaction decision value from GA and GH request
     *
     * @returns {string}
     * @memberof WebhookRequest
     */
    getTransactionDecisionValueFromGoogleAssistanceRequest() {
        if (!this.request.originalDetectIntentRequest.payload) {
            return null
        } else {
            //Get input object where agument name is 'TRANSACTION_DECISION_VALUE'
            const input = this.request.originalDetectIntentRequest.payload.inputs.find(input => {
                return input.arguments.find(argument => argument.name == 'TRANSACTION_DECISION_VALUE')
            })
            // If 'input' is not null
            if (input) {
                // Get 'TRANSACTION_DECISION_VALUE' 
                if (input.arguments[0].extension && input.arguments[0].extension.transactionDecision) {
                    return input.arguments[0].extension.transactionDecision  // ORDER_ACCEPTED, ORDER_REJECTED, CART_CHANGE_REQUESTED,USER_CANNOT_TRANSACT
                } else {
                    return false
                }
            }
        }
    }

    /**
     * Get order details from GA and GH request
     *
     * @returns
     * @memberof WebhookRequest
     */
    getAcceptedOrderFromGoogleAssistanceRequest() {
        if (!this.request.originalDetectIntentRequest.payload) {
            return null
        } else {
            //Get input object where agument name is 'TRANSACTION_DECISION_VALUE'
            const input = this.request.originalDetectIntentRequest.payload.inputs.find(input => {
                return input.arguments.find(argument => argument.name == 'TRANSACTION_DECISION_VALUE')
            })
            // If 'input' is not null
            if (input) {
                // Get 'TRANSACTION_DECISION_VALUE' 
                if (input.arguments[0].extension && input.arguments[0].extension.order) {
                    return input.arguments[0].extension.order //Order Details
                } else {
                    return null
                }
            }
        }
    }

    /**
     * Get user details of returning user who has already signed in to GA/GH bot
     * - THIS IS NOT SIGN IN REQUEST VALIDATION 
     * @returns
     * @memberof WebhookRequest
     */
    getUserDetailsFromGoogleAssistanceRequest() { //NOT SIGN IN REQUEST
        try {
            const token = this.request.originalDetectIntentRequest.payload.user.idToken || null
            if (token) {
                const decodedToken: any = jwt.decode(token)
                if (decodedToken && decodedToken.iss == "https://accounts.google.com") {
                    return { isRejected: false, userdetails: { name: decodedToken.name, email: decodedToken.email } }
                } else {
                    return { isRejected: false, userdetails: null }
                }
            } else {
                return { isRejected: false, userdetails: null }
            }
        } catch (e) { return { isRejected: false, userdetails: null } }
    }

    /**
     * Get user details from SIGN_IN request
     * - THIS IS 'SIGN_IN' request handler
     * @returns {
             isRejected: false, 
                userdetails: { 
                    name: decodedToken.name, 
                    email: decodedToken.email 
                } 
             }
     * @memberof WebhookRequest
     */
    getUserDetailsFromGoogleAssistanceSignInRequest() {

        let status = null
        //Set staus OK if user idToken is available
        if (this.request.originalDetectIntentRequest && this.request.originalDetectIntentRequest.payload && this.request.originalDetectIntentRequest.payload.user && this.request.originalDetectIntentRequest.payload.user.idToken) {
            status = "OK"
        } else { // Get SIGN_IN status
            status = this.getSignInStatusFromGoogleAssistanceRequest()
        }

        //If 'status' is OK, decode the JWT token and return the user details
        if (status == "OK") {
            try {
                const token = this.request.originalDetectIntentRequest.payload.user.idToken || null
                if (token) {
                    const decodedToken: any = jwt.decode(token)
                    if (decodedToken && decodedToken.iss == "https://accounts.google.com") {
                        //this.sharedDbHelper.SaveCustomerDetails(decodedToken.name,'',decodedToken.email,true) //SAVE CUSTOMER DETAILS TO LOCAL DB
                        return { isRejected: false, userdetails: { name: decodedToken.name, email: decodedToken.email } }
                    } else {
                        return { isRejected: false, userdetails: null }
                    }
                }
            } catch (e) { return { isRejected: false, userdetails: null } }
        } else if (status == "CANCELLED") {
            // Return 'isRejected' true if status is 'CANCELLED'
            return { isRejected: true, userdetails: null }
        } else { // Decode token in other cases where 'status' is not available
            try {
                if (this.request.originalDetectIntentRequest && this.request.originalDetectIntentRequest.payload && this.request.originalDetectIntentRequest.payload.user && this.request.originalDetectIntentRequest.payload.user.idToken) {
                    const decodedToken: any = jwt.decode(this.request.originalDetectIntentRequest.payload.user.idToken)
                    if (decodedToken && decodedToken.iss == "https://accounts.google.com") {
                        //this.sharedDbHelper.SaveCustomerDetails(decodedToken.name,'',decodedToken.email,true) //SAVE CUSTOMER DETAILS TO LOCAL DB
                        return { isRejected: false, userdetails: { name: decodedToken.name, email: decodedToken.email } }
                    } else {
                        return { isRejected: false, userdetails: null }
                    }
                }
            }catch (e) {
                return { isRejected: false, userdetails: null }
            }
            return { isRejected: false, userdetails: null }
        }
    }


    /**
     * Get user details of user who has already signed ON SALESIQ
     * - THIS IS NOT SIGN IN REQUEST VALIDATION 
     * @returns
     * @memberof WebhookRequest
     */
    getVisitorInfoSalesIQRequest() { //NOT SIGN IN REQUEST
        try {
            const payload = this.request.originalDetectIntentRequest.payload || null
            if (payload) {
               return payload.visitor || null
            } else {
                return null
            }
        } catch (e) { return null }
    }
}



export interface IWebhookRequest {
    responseId: string;
    session: string;
    queryResult: IQueryResult;
    originalDetectIntentRequest: IoriginalDetectIntentRequest;
}
export interface IQueryResult {
    languageCode: string;
    queryText: string;
    fulfillmentText: string;
    action: string;
    allRequiredParamsPresent: boolean;
    parameters: any;
    outputContexts?: (IOutputContext)[] | null;
    intent: IIntent;
    fulfillmentMessages?: (IFulfillmentMessages)[] | null;
    intentDetectionConfidence: number;
    diagnosticInfo?: IDiagnosticInfo;
}

export interface IOutputContext {
    name: string;
    lifespanCount?: number;
    parameters: any;
}
export interface IIntent {
    name: string;
    displayName: string;
    isFallback?: any;
}
export interface IFulfillmentMessages {
}

export interface IDiagnosticInfo {
}

export interface IoriginalDetectIntentRequest {
    source?: string;
    version?: number;
    payload?: any;
    conversation?: any;
    inputs?: any[];
    surface?: any[];
    isInSandbox?: boolean;
    requestType?: string
}

//Transactional API Interfaces

