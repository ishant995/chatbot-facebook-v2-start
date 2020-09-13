"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM = void 0;
const constant_1 = require("./constant");
const df_card_1 = require("./responses/df-card");
const df_quickreplies_1 = require("./responses/df-quickreplies");
const df_quickrepliesinput_1 = require("./responses/df-quickrepliesinput");
const df_text_1 = require("./responses/df-text");
const message_payload_1 = require("./responses/message-payload");
const webhook_payload_1 = require("./responses/webhook-payload");
const zoho_responses_1 = require("./responses/zoho-responses");
const _ = require("lodash");
/**
 * Webhook response class to send response to webhook request
*/
class WebhookResponse {
    /**
     * Creates an instance of WebhookResponse.
     * @param {WebhookRequest} webhookRequest
     * @param {*} currentIntentName
     * @memberof WebhookResponse
     */
    constructor(webhookRequest, currentIntentName) {
        this.dfMessages = [];
        /**
         * Create a new instace of zohoSalesIQ response
         * @memberof WebhookResponse
         */
        this.zohoResponse = {
            payload: new zoho_responses_1.SalesIQMessage()
        };
        this.currentIntentName = null;
        //To update runtime entities
        this.sessionEntityTypes = [];
        /**
         * Utility function to merge two SSMLs
         *
         * @param {string} oldSSML
         * @param {string} newSSML
         * @returns
         */
        this.mergeSSML = (oldSSML, newSSML) => {
            let ssml_old = oldSSML.replace(/<speak>/g, "").replace(/<\/speak>/g, "");
            let ssml_new = newSSML.replace(/<speak>/g, "").replace(/<\/speak>/g, "");
            return `<speak>${ssml_old}${ssml_old ? "." : ""} ${ssml_new}</speak>`;
        };
        this.webhookRequest = webhookRequest;
        this.messagePayload = new message_payload_1.default();
        this.webhookPayload = new webhook_payload_1.default();
        this.googlePayload = new webhook_payload_1.Google(),
            this.currentIntentName = currentIntentName;
    }
    /**
     * Common method to handle all types of response messages
     * - Mainly used for text, quick replies
     * - Internally it handles conversion to multiple platform response formats
     *
     * @param {SalesIQResponse| any} dfMessage
     * @param {boolean} [isZohoSuggestion=false] // To add quick replies as SalesIQ suggestion
     * @param {boolean} [generateSalesIQ=true]   // Flag to handle salesIQ Response generation
     * @param {boolean} [generateGAResponse=true] //Should generate GA/GH response. Default: true
     * @param {boolean} [sendtodisplaydevice=false] //Should send responses to GA/GH display devices. Default: false
     * @param {boolean} [dislikeaction=false] //Should add SalesIQ dislike action. Default: false
     * @param {boolean} [otheraction=false] //Should add SalesIQ other action. Default: false
     * @memberof WebhookResponse
     */
    addDFMessage(dfMessage, isZohoSuggestion = false, generateSalesIQ = true, generateGAResponse = true, sendtodisplaydevice = false, dislikeaction = false, otheraction = false) {
        // If message is NOT an instance of 'SalesIQResponse'
        if (!(dfMessage instanceof zoho_responses_1.SalesIQResponse)) {
            //If message is an instance of DFText or DFCard or DFQuickReplies add JSON response in responce message array
            if ((dfMessage instanceof df_text_1.default) || (dfMessage instanceof df_card_1.default) || (dfMessage instanceof df_quickreplies_1.default) || (dfMessage instanceof df_quickrepliesinput_1.default)) {
                if (dfMessage instanceof df_text_1.default) {
                    dfMessage = this.updateVehicleNameInResponse(dfMessage);
                }
                this.dfMessages.push(dfMessage.getJSON());
            }
            else if (dfMessage instanceof message_payload_1.CustomAdditionalPayload) { // If message is an instance of CustomAdditionalPayload add playload and platform
                this.dfMessages.push({ payload: dfMessage, platform: dfMessage.platform });
            }
            else if (dfMessage instanceof zoho_responses_1.SalesIQPayload) { // If message is an instance of SalesIQPayload add message as Zoho Payload
                this.addZohoPayload(dfMessage);
            }
            else {
                this.dfMessages.push(dfMessage);
            }
            /**
             * Create Custom TEXT Message and Zoho TEXT Message automatically while adding DF Message
             */
            if (dfMessage instanceof df_text_1.default) {
                //Add custom text in message payload
                this.messagePayload.add(new message_payload_1.CustomText(dfMessage.text, PLATFORM.FACEBOOK));
                //if generateSalesIQ flag is 'true' add salesiq text response
                if (generateSalesIQ) {
                    this.addZohoTextMessage(dfMessage.text, dfMessage.image, dfMessage.type, dfMessage.link);
                }
                //if generateGAResponse flag is 'true' and request is from a google device, add GA/GH text response
                if (generateGAResponse && this.webhookRequest.getOriginalDetectIntentRequest() == "google") {
                    this.addGooglePayloadText(dfMessage.googleText, dfMessage.speech, sendtodisplaydevice);
                }
                //if request is a whatsapp request, add GA/GH text response
                if (this.webhookRequest.isWhatsappRequest()) {
                    this.addGooglePayloadText(dfMessage.googleText, dfMessage.speech, sendtodisplaydevice);
                }
            }
            /**
            * Create Custom Quick replies and Zoho Quick replies automatically while adding DF Message
            */
            if (dfMessage instanceof df_quickreplies_1.default) {
                // Add quick replies as zoho suggestion
                if (isZohoSuggestion) {
                    //if generateSalesIQ flag is 'true' add salesiq quick replies response
                    if (generateSalesIQ) {
                        this.addZohoSuggestions(dfMessage.quickReplies);
                    }
                }
                else { // Add quick replies as single option
                    //if generateSalesIQ flag is 'true' add salesiq quick replies response
                    if (generateSalesIQ) {
                        this.addZohoQuickReplies(dfMessage.quickReplies, dfMessage.title);
                    }
                }
                //if generateGAResponse flag is 'true' and request is from a google device, add GA/GH quick replies response
                if (generateGAResponse && this.webhookRequest.getOriginalDetectIntentRequest() == "google") {
                    this.addGooglePayloadSuggestions(dfMessage.quickReplies, sendtodisplaydevice);
                }
                //if request is a whatsapp request, add GA/GH quick replies response
                if (this.webhookRequest.isWhatsappRequest()) {
                    this.addGooglePayloadSuggestions(dfMessage.quickReplies, sendtodisplaydevice);
                }
            }
            if (dfMessage instanceof df_quickrepliesinput_1.default) {
                if (generateSalesIQ) {
                    this.addZohoQuickReplies(dfMessage.quickReplies, dfMessage.title, dfMessage.type, dfMessage.placeholder, dfMessage.value, dfMessage.error);
                }
            }
            // if dislikeaction flag is set add 'dislikeaction' payload
            if (dislikeaction) {
                this.addZohoDislikeaction();
            }
            // if otheraction flag is set add 'otheraction' payload
            if (otheraction) {
                this.addZohoOtherQuery();
            }
        }
        else {
            this.dfMessages.push(dfMessage);
        }
    }
    /**
     * Add SalesIQ text response
     *
     * @param {string| string[]} text
     * @memberof WebhookResponse
     */
    addZohoTextMessage(text, image = '', type = '', links = []) {
        //Initialize replies array
        if (!this.zohoResponse.payload.replies) {
            this.zohoResponse.payload.replies = [];
        }
        //Add parameter is an instance of Array add all strings as text messages in replies array
        if (text instanceof Array) {
            text.forEach(textItem => {
                let reply = new zoho_responses_1.SalesIQReplies();
                reply.text = textItem;
                if (reply.image == null || reply.image == '' || reply.image == "" || reply.image == " " || reply.image == undefined || reply.image == "-") {
                    delete reply.image;
                }
                this.zohoResponse.payload.replies.concat(reply);
            });
        }
        else { //Add single text in replies array
            let reply = new zoho_responses_1.SalesIQReplies();
            reply.text = text;
            reply.image = image;
            if (reply.type == null || reply.type == '' || reply.type == "" || reply.type == " " || reply.type == undefined || reply.type == "-") {
                delete reply.type;
                delete reply.links;
            }
            if (type != '' && type == "links") {
                reply.type = type;
                reply.links = links;
            }
            if (reply.image == null || reply.image == '' || reply.image == "" || reply.image == " " || reply.image == undefined || reply.image == "-") {
                delete reply.image;
            }
            if (type == 'forward') {
                this.zohoResponse.payload.action = 'forward';
            }
            this.zohoResponse.payload.replies.push(reply);
        }
    }
    /**
     * Add SalesIQ quick replies
     *
     * @param {string[]} quickReplies
     * @param {*} [title=null]
     * @memberof WebhookResponse
     */
    addZohoQuickReplies(quickReplies, title = null, type = 'select', placeholder = '', value = '', error = []) {
        //Initialize input object
        if (!this.zohoResponse.payload.input) {
            this.zohoResponse.payload.input = new zoho_responses_1.SalesIQInput();
        }
        //Add quick replies
        this.zohoResponse.payload.input.options = quickReplies;
        //Add title
        this.zohoResponse.payload.input.title = title;
        //Add Type if provided
        this.zohoResponse.payload.input.type = type;
        //Add placeholder if provided
        this.zohoResponse.payload.input.placeholder = placeholder;
        //Add value if provided
        this.zohoResponse.payload.input.value = value;
        //Add error if provided
        this.zohoResponse.payload.input.error = error;
        if (type == "location") {
            this.zohoResponse.payload.input.lat = this.zohoResponse.payload.input.error[0];
            this.zohoResponse.payload.input.lng = this.zohoResponse.payload.input.error[1];
            this.zohoResponse.payload.input.label = this.zohoResponse.payload.input.title;
            this.zohoResponse.payload.input.select_label = this.zohoResponse.payload.input.value;
            this.zohoResponse.payload.input.title = "";
            this.zohoResponse.payload.input.error = [];
            this.zohoResponse.payload.input.value = "";
        }
        if (type != "location") {
            delete this.zohoResponse.payload.input.lat;
            delete this.zohoResponse.payload.input.lng;
            delete this.zohoResponse.payload.input.label;
            delete this.zohoResponse.payload.input.select_label;
        }
        else {
            delete this.zohoResponse.payload.input.title;
            delete this.zohoResponse.payload.input.error;
            delete this.zohoResponse.payload.input.value;
            delete this.zohoResponse.payload.input.options;
            delete this.zohoResponse.payload.input.placeholder;
        }
    }
    /**
     * Add SalesIQ suggestions
     *
     * @param {string[]} suggestions
     * @memberof WebhookResponse
     */
    addZohoSuggestions(suggestions) {
        //Initialize suggestions array
        if (!this.zohoResponse.payload.suggestions) {
            this.zohoResponse.payload.suggestions = [];
        }
        // Add SalesIQ Suggestions
        this.zohoResponse.payload.suggestions = suggestions;
    }
    /**
     * Add SalesIQ payload
     * @param {*} payload
     * @memberof WebhookResponse
     */
    addZohoPayload(payload) {
        this.zohoResponse.payload.payload = payload;
    }
    /**
     * Add SalesIQ payload for dislike action
     * @memberof WebhookResponse
     */
    addZohoDislikeaction() {
        if (!this.zohoResponse.payload.dislikeactions) {
            this.zohoResponse.payload.dislikeactions = [];
        }
        let dislikeaction = new zoho_responses_1.OtherAction();
        dislikeaction.text = "Dislike";
        dislikeaction.action = "Dislike";
        this.zohoResponse.payload.dislikeactions.push(dislikeaction);
    }
    /**
     * Add SalesIQ payload for other query action
     * @memberof WebhookResponse
     */
    addZohoOtherQuery() {
        if (!this.zohoResponse.payload.otheractions) {
            this.zohoResponse.payload.otheractions = [];
        }
        let otheractions = new zoho_responses_1.OtherAction();
        otheractions.text = "Other Query";
        otheractions.action = "";
        this.zohoResponse.payload.otheractions.push(otheractions);
    }
    /**
     * Add google text rich responses
     *
     * @param {string} text
     * @param {String} speech
     * @param {boolean} sendtodisplaydevice
     * @memberof WebhookResponse
     */
    addGooglePayloadText(text, speech, sendtodisplaydevice) {
        //Initialize rich responses items array
        if (!this.googlePayload.richResponse.items) {
            this.googlePayload.richResponse.items = [];
        }
        // Get simpleResponses items length 
        let googleSimpleResponsesItemsLength = this.googlePayload.richResponse.items.filter(a => a.simpleResponse != null).length;
        // Already have simple response in rich response array
        if (googleSimpleResponsesItemsLength > 0) {
            // Only a  single simple response item. Add second item.
            if (googleSimpleResponsesItemsLength == 1 || this.webhookRequest.isWhatsappRequest()) {
                let googleItem = new webhook_payload_1.GoogleItem();
                googleItem.simpleResponse = new webhook_payload_1.GoogleSimpleResponse();
                let updatedTextToSpeechResponse = this.updateTexttoSpeechResponse(speech);
                googleItem.simpleResponse.displayText = text;
                googleItem.simpleResponse.ssml = updatedTextToSpeechResponse;
                this.googlePayload.richResponse.items.push(googleItem);
            }
            else { //googleItemsLength==2 //append the response in last simple response
                //get second item
                let googleItem = this.googlePayload.richResponse.items.filter(a => a.simpleResponse != null)[1];
                if (!googleItem.simpleResponse) {
                    googleItem.simpleResponse = new webhook_payload_1.GoogleSimpleResponse();
                }
                let updatedTextToSpeechResponse = this.updateTexttoSpeechResponse(speech);
                // Merge Display text
                googleItem.simpleResponse.displayText = `${googleItem.simpleResponse.displayText || ""}${googleItem.simpleResponse.displayText ? '\n' : ""}${text}`;
                //Merge SSML
                googleItem.simpleResponse.ssml = this.mergeSSML(googleItem.simpleResponse.ssml || "", updatedTextToSpeechResponse);
            }
        }
        else { //Add first simple response in rich response array
            let googleItem = new webhook_payload_1.GoogleItem();
            googleItem.simpleResponse = new webhook_payload_1.GoogleSimpleResponse();
            let updatedTextToSpeechResponse = this.updateTexttoSpeechResponse(speech);
            googleItem.simpleResponse.displayText = text;
            googleItem.simpleResponse.ssml = updatedTextToSpeechResponse;
            this.googlePayload.richResponse.items.push(googleItem);
        }
        // Add Sent To Display device SystemIntent
        if (sendtodisplaydevice) {
            this.googlePayload.systemIntent = new webhook_payload_1.ISystemIntent("Let's move you to a screen device for cards and other visual responses", "Try your Action here!");
        }
    }
    /**
     * Create speech response for GA and GH
     *
     * @param {string} text
     * @param {string} speech
     * @param {string[]} options
     * @param {boolean} [isAddress=false]
     * @param {boolean|number} [shouldSpeakOptions=true]
     * @param {boolean} [sendtodisplaydevice=false]
     * @returns
     * @memberof WebhookResponse
     */
    createSpeechResponseForGoogleHome(text, speech, options, isAddress = false, shouldSpeakOptions = true, sendtodisplaydevice = false) {
        //if request is from Google devices
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google") {
            /**
             * Update vehicle name in text and speech response
            */
            if (text) {
                text = this.updateVehicleNameInResponseGoogle(text);
            }
            if (speech) {
                speech = this.updateVehicleNameInResponseGoogle(speech);
            }
            /**
            * Speak options with break of 500ms
            * - if options are of 'addresses' replace '/' characters with 'slash' in speech
            */
            let choices = `<break time="500ms"/>`;
            options.forEach((option, index) => {
                if (index < options.length - 1) {
                    choices += `${isAddress ? option.replace(/\//g, " slash ").toLowerCase() : ` ${option} `}.<break time="500ms"/>`;
                }
                else { //Last choice
                    choices += `${isAddress ? option.replace(/\//g, " slash ").toLowerCase() : ` ${option} `}`;
                }
            });
            let ssml = speech.replace(/<speak>/g, "").replace(/<\/speak>/g, "") + " ";
            //Do not speak on any device GA or GH
            if (!shouldSpeakOptions) {
                if (!this.webhookRequest.isScreenDevice()) {
                    ssml += choices;
                }
            }
            else {
                if (!this.webhookRequest.isScreenDevice()) {
                    ssml += choices;
                }
                else {
                    //Do not speak on GA
                }
            }
            /*
                        if (shouldSpeakOptions != -1) {
                            if (!shouldSpeakOptions) {
                                if (!this.webhookRequest.isScreenDevice()) {   //Speak on GH
                                    ssml += choices
                                }
                            } else {
                                ssml += choices
                            }
                        } else {
                            if (!this.webhookRequest.isScreenDevice()) {
                                ssml += choices
                            } else {
                                //Do not speak on GA
                            }
                        }
            */
            return this.addGooglePayloadText(text, this.updateTexttoSpeechResponse(`<speak>${ssml}</speak>`), sendtodisplaydevice);
        }
    }
    /**
     * Utility function to update SSML to pronounce word properly
     * @param {*} response
     * @returns
     * @memberof WebhookResponse
     */
    updateTexttoSpeechResponse(response) {
        response = response.replace(/XUV300/gi, 'X U V 3 double O');
        response = response.replace(/TUV300/gi, "T U V 3 double O");
        response = response.replace(/XUV500/gi, "X U V 5 double O");
        response = response.replace(/XUV 300/gi, 'X U V 3 double O');
        response = response.replace(/TUV 300/gi, "T U V 3 double O");
        response = response.replace(/XUV 500/gi, "X U V 5 double O");
        response = response.replace(/KUV100/gi, 'K U V one double O');
        response = response.replace(/KUV 100/gi, 'K U V one double O');
        response = response.replace(/₹/g, "rupees ");
        response = response.replace(/Rs\./g, "rupees ");
        response = response.replace(/2WD/gi, " 2 wheel drive ");
        response = response.replace(/4WD/gi, " 4 wheel drive ");
        response = response.replace(/FWD/gi, " front wheel drive ");
        response = response.replace(/ OPT /gi, " optional ");
        response = response.replace(/\(O\)/g, " optional ");
        response = response.replace(/ AMT /gi, " automatic ");
        response = response.replace(/\*/g, "");
        response = response.replace(/ AT /g, " automatic ");
        response = response.replace(/ AWD /gi, " all wheel drive ");
        response = response.replace(/syouv/g, " S U V ");
        response = response.replace(/ PVT /gi, " Private ");
        response = response.replace(/ LTD /gi, " Limited ");
        response = response.replace(/ EMI /gi, " E M I ");
        response = response.replace(/^EMI /gi, " E M I ");
        // response = response.replace(/[^>](\d{10})/g, ` <say-as interpret-as="digits">$1</say-as> `) //Mobile Number
        // response = response.replace(/[^>](1800209)[.*]/g, ` <say-as interpret-as="digits">$1</say-as> `) //Mobile Number
        // response = response.replace(/[^>](\d{6})/g, ` <say-as interpret-as="digits">$1</say-as> `) //Pincode
        response = response.replace(/[^>](\d{10})/g, ` <say-as interpret-as="digits">$1</say-as> `); //Mobile Number
        response = response.replace(/[^>](1800209)[.*]/g, ` <say-as interpret-as="digits">$1</say-as> `); //Mobile Number
        response = response.replace(/[^(>|\d)](\d{6})[^(\d)]/g, ` <say-as interpret-as="digits">$1</say-as> `); //Pincode
        response = response.replace(/ NXT/gi, " Next");
        response = response.replace(/ NXT /gi, " Next ");
        response = response.replace(/ Nxt /gi, " Next ");
        response = response.replace(/ N X T /gi, " Next ");
        response = response.replace(/HWRDBLK/gi, " Highway red black ");
        response = response.replace(/NBLKSLVR/gi, " Napoli black silver ");
        response = response.replace(/ 100HP /gi, " hundread HP ");
        response = response.replace(/ ABS /gi, " A.B.S ");
        response = response.replace(/ LTD. /gi, " Limited ");
        response = response.replace(/ PVT. /gi, " Private ");
        response = response.replace(/ AMT /gi, " A M T ");
        response = response.replace(/ SOS /gi, " S O S ");
        response = response.replace(/ apsunde /gi, " upsunde ");
        return response;
    }
    /**
     * Common Utility function to update vehicle name and city name in responses
     *
     * @param {DFText} dfMessage
     * @returns
     * @memberof WebhookResponse
     */
    updateVehicleNameInResponse(dfMessage) {
        let cityName = null;
        let contextCity = null;
        //get city name from the current intent if available
        if (this.currentIntentName) {
            contextCity =
                this.webhookRequest.getParameterFromContext('location.original', this.currentIntentName) ||
                    this.webhookRequest.getParameterFromContext('address.original', this.currentIntentName) ||
                    this.webhookRequest.getParameterFromContext('city.original', this.currentIntentName) ||
                    this.webhookRequest.getParameterFromContext('td_city.original', this.currentIntentName) ||
                    this.webhookRequest.getParameterFromContext('contextCity', constant_1.default.PRICECONSTANT.WELCOME_CONTEXT);
        }
        //get city name from the 'contextCity' object
        if (contextCity && contextCity.cityname) {
            cityName = _.startCase(_.lowerCase(contextCity.cityname));
        }
        else {
            cityName = _.startCase(_.lowerCase(contextCity)); // this will be a string object
        }
        // Get vehicle array from environmental variables
        let vehicle_list = JSON.parse(process.env.VEHICLES || "[]");
        // get vehicle code from the request
        const vehicleCode = this.webhookRequest.getParameterFromContext('Vehicle', constant_1.default.PRICECONSTANT.WELCOME_CONTEXT) || this.webhookRequest.getParameterFromContext('ContextVehicle', constant_1.default.PRICECONSTANT.WELCOME_CONTEXT);
        // Find vehicle from the vehicle list which matches vehicle code
        const vehicleName = vehicle_list ? vehicle_list.find(a => a.modelcode == vehicleCode) : null;
        // Replace #vehicle with vehicle name
        if (vehicleName) {
            dfMessage.text = dfMessage.text.replace(/#vehicle/gi, vehicleName.name);
            dfMessage.googleText = dfMessage.googleText.replace(/#vehicle/gi, vehicleName.name);
            dfMessage.speech = dfMessage.speech.replace(/#vehicle/gi, vehicleName.name);
        }
        else {
            dfMessage.text = dfMessage.text.replace(/#vehicle/gi, "selected vehicle");
            dfMessage.googleText = dfMessage.googleText.replace(/#vehicle/gi, "selected vehicle");
            dfMessage.speech = dfMessage.speech.replace(/#vehicle/gi, "selected vehicle");
        }
        // Replace #cityname with city name
        if (cityName) {
            dfMessage.text = dfMessage.text.replace(/#cityname/gi, cityName);
            dfMessage.googleText = dfMessage.googleText.replace(/#cityname/gi, cityName);
            dfMessage.speech = dfMessage.speech.replace(/#cityname/gi, cityName);
        }
        else {
            dfMessage.text = dfMessage.text.replace(/#cityname/gi, 'selected city');
            dfMessage.googleText = dfMessage.googleText.replace(/#cityname/gi, 'selected city');
            dfMessage.speech = dfMessage.speech.replace(/#cityname/gi, 'selected city');
        }
        //return same message
        return dfMessage;
    }
    /**
     * Common Utility function to update vehicle name and city name in responses for GA and GH
     *
     * @param {string} text
     * @returns
     * @memberof WebhookResponse
     */
    updateVehicleNameInResponseGoogle(text) {
        let cityName = null;
        let contextCity = null;
        //get city name from the current intent if available
        if (this.currentIntentName) {
            contextCity = this.webhookRequest.getParameterFromContext('location.original', this.currentIntentName) ||
                this.webhookRequest.getParameterFromContext('address.original', this.currentIntentName) ||
                this.webhookRequest.getParameterFromContext('city.original', this.currentIntentName) ||
                this.webhookRequest.getParameterFromContext('td_city.original', this.currentIntentName) ||
                this.webhookRequest.getParameterFromContext('contextCity', constant_1.default.PRICECONSTANT.WELCOME_CONTEXT);
        }
        //get city name from the 'contextCity' object
        if (contextCity && contextCity.cityname) {
            cityName = _.startCase(_.lowerCase(contextCity.cityname));
        }
        else {
            cityName = _.startCase(_.lowerCase(contextCity));
        }
        // Get vehicle array from environmental variables
        let vehicle_list = JSON.parse(process.env.VEHICLES || "[]");
        // get vehicle code from the request
        const vehicleCode = this.webhookRequest.getParameterFromContext('Vehicle', constant_1.default.PRICECONSTANT.WELCOME_CONTEXT) || this.webhookRequest.getParameterFromContext('ContextVehicle', constant_1.default.PRICECONSTANT.WELCOME_CONTEXT);
        // Find vehicle from the vehicle list which matches vehicle code
        const vehicleName = vehicle_list ? vehicle_list.find(a => a.modelcode == vehicleCode) : null;
        // Replace #vehicle with vehicle name
        if (vehicleName) {
            text = text.replace(/#vehicle/gi, vehicleName.name);
        }
        else {
            text = text.replace(/#vehicle/gi, "selected vehicle");
        }
        // Replace #cityname with city name
        if (cityName) {
            text = text.replace(/#cityname/gi, cityName);
        }
        else {
            text = text.replace(/#cityname/gi, 'selected city');
        }
        //return string
        return text;
    }
    /**
     * Add google suggestion chips
     *
     * @param {any[]} suggestions
     * @param {boolean} sendtodisplaydevice
     * @memberof WebhookResponse
     */
    addGooglePayloadSuggestions(suggestions, sendtodisplaydevice) {
        //Initiase suggestions array
        if (!this.googlePayload.richResponse.suggestions) {
            this.googlePayload.richResponse.suggestions = [];
        }
        //Add all suggestions in response array
        suggestions.forEach(suggestion => {
            let googleSuggestion = new webhook_payload_1.GoogleSuggestion();
            googleSuggestion.title = suggestion;
            this.googlePayload.richResponse.suggestions.push(googleSuggestion);
        });
        //Send display device system intent if flag is set
        if (sendtodisplaydevice) {
            this.googlePayload.systemIntent = new webhook_payload_1.ISystemIntent("Let's move you to a screen device for cards and other visual responses", "Try your Action here!");
        }
    }
    /**
     * Add a single GoogleCarouselItem
     *
     * @param {GoogleCarouselItem} carousel
     * @memberof WebhookResponse
     */
    addGoogleCarousel(carousel) {
        //if request is from google SCREEN device
        let source = this.webhookRequest.getParameterFromContext('source', constant_1.default.Infobip.WELCOME_CONTEXT);
        if ((this.webhookRequest.getOriginalDetectIntentRequest() == "google" && this.webhookRequest.isScreenDevice()) || source == "WHATSAPP") {
            //Initialize richResponse items
            if (!this.googlePayload.richResponse.items) {
                this.googlePayload.richResponse.items = [];
            }
            //Get length of carousel items if already pushed
            let googleCarouselItemsLength = this.googlePayload.richResponse.items.filter(a => a.carouselBrowse != null).length;
            //Create new carouselBrowse object if pushing the first carousel item
            if (googleCarouselItemsLength == 0) {
                let carouselItem = new webhook_payload_1.GoogleItem();
                carouselItem.carouselBrowse = new webhook_payload_1.GoogleCarousel();
                //Initialize items of carouselBrowse items
                if (!carouselItem.carouselBrowse.items) {
                    carouselItem.carouselBrowse.items = [];
                }
                //push item
                carouselItem.carouselBrowse.items.push(carousel);
                //push corousel item
                this.googlePayload.richResponse.items.push(carouselItem);
            }
            else { // carouselBrowse item already present in 'richResponse'
                if (googleCarouselItemsLength == 1) {
                    //Get already pushed carousel item
                    let googleCarouselItem = this.googlePayload.richResponse.items.find(a => a.carouselBrowse != null);
                    if (!googleCarouselItem.carouselBrowse.items) {
                        googleCarouselItem.carouselBrowse.items = [];
                    }
                    //push item in carousel item
                    googleCarouselItem.carouselBrowse.items.push(carousel);
                }
            }
        }
    }
    /**
     * Add a single GoogleCarouselItem
     *
     * @param {GoogleTableCards} googlecarditem
     * @memberof WebhookResponse
     */
    addGoogleTableCard(googlecarditem) {
        //if request is from google SCREEN device
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google" && this.webhookRequest.isScreenDevice()) {
            //Initialise  items
            if (!this.googlePayload.richResponse.items) {
                this.googlePayload.richResponse.items = [];
            }
            let googleItemLength = this.googlePayload.richResponse.items.length;
            if (googleItemLength == 0) {
                let tableItem = new webhook_payload_1.GoogleItem();
                tableItem.tableCard = new webhook_payload_1.GoogleTableCards();
                tableItem.tableCard = googlecarditem;
                this.googlePayload.richResponse.items.push(tableItem);
            }
            else {
                let tableItem = this.googlePayload.richResponse.items[0];
                tableItem.tableCard = googlecarditem;
            }
        }
    }
    addGoogleTableCardCell(text) {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google" && this.webhookRequest.isScreenDevice()) {
            let cellitem = new webhook_payload_1.GoogleTableCardsItemCell();
            cellitem.text = text;
            return cellitem;
        }
    }
    addGoogleTableCards(rows, columnProperties) {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google" && this.webhookRequest.isScreenDevice()) {
            let cellitem = new webhook_payload_1.GoogleTableCards();
            cellitem.rows = rows;
            cellitem.columnProperties = columnProperties;
            return cellitem;
        }
    }
    /**
     * Add a single GoogleListItem
     *
     * @param {GoogleListItem} googleListItem
     * @param {*} listTitle
     * @memberof WebhookResponse
     */
    addGoogleList(googleListItem, listTitle) {
        //if request is from google SCREEN device
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google" && this.webhookRequest.isScreenDevice()) {
            //Initialize system intent
            if (!this.googlePayload.systemIntent) {
                this.googlePayload.systemIntent = new webhook_payload_1.GoogleListIntent();
            }
            //Map system intent data to GoogleListData
            if (!this.googlePayload.systemIntent.data) {
                this.googlePayload.systemIntent.data = new webhook_payload_1.GoogleListData(listTitle);
            }
            //Initialise list items
            if (this.googlePayload.systemIntent instanceof webhook_payload_1.GoogleListIntent) {
                if (!this.googlePayload.systemIntent.data.listSelect.items) {
                    this.googlePayload.systemIntent.data.listSelect.items = [];
                }
                // Push googleListItem in the list items array
                this.googlePayload.systemIntent.data.listSelect.items.push(googleListItem);
            }
        }
    }
    /**
     * Add google Sign Request
     * -Initiates account linking
     * @memberof WebhookResponse
     */
    addGoogleSignInRequest() {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google") {
            if (!this.googlePayload.systemIntent) {
                this.googlePayload.systemIntent = new webhook_payload_1.GoogleSignInIntent();
            }
        }
    }
    /**
     * Request for 'PERMISSION' request
     * - Initiates name and location request
     * @param {string} [msg="To know your location"] //display message while asking permission
     * @param {string[]} [permissions] // NAME, PROFILE_PICTURE, COARSE_LOCATION
     * @memberof WebhookResponse
     */
    addGooglePermissionRequest(msg = "To know your location", permissions) {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google") {
            if (!this.googlePayload.systemIntent) {
                this.googlePayload.systemIntent = new webhook_payload_1.GooglePermissionIntent();
                this.googlePayload.systemIntent.data = new webhook_payload_1.GooglePermissionData(msg, permissions);
            }
        }
    }
    /**
     * Add a google link-out suggestion
     *
     * @param {*} destinationName  //Link title
     * @param {*} URL //Link URL
     * @memberof WebhookResponse
     */
    addGoogleLinkOutSuggestion(destinationName, URL) {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google" || this.webhookRequest.isWhatsappRequest()) {
            if (!this.googlePayload.richResponse.linkOutSuggestion) {
                this.googlePayload.richResponse.linkOutSuggestion = new webhook_payload_1.GoogleLinkOutSuggestion(destinationName, URL);
            }
            else {
                this.googlePayload.richResponse.linkOutSuggestion.destinationName = destinationName;
                this.googlePayload.richResponse.linkOutSuggestion.openUrlAction.url = URL;
            }
        }
    }
    /**
     * Add a google link-out suggestion
     *
     * @param {*} destinationName  //Link title
     * @param {*} URL //Link URL
     * @memberof WebhookResponse
     */
    addGoogleBasicCard(title, subtitle, buttontitle, buttonurl, imageurl, imgalt) {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google") {
            if (!this.googlePayload.richResponse.items) {
                let googleItem = new webhook_payload_1.GoogleItem();
                let cellitem = new webhook_payload_1.GoogleBasicCard();
                cellitem.imageDisplayOptions = "CROPPED";
                cellitem.title = title;
                cellitem.subtitle = subtitle;
                cellitem.buttons = [
                    {
                        "title": buttontitle,
                        "openUrlAction": {
                            "url": buttonurl
                        }
                    }
                ];
                if (imageurl != null && imageurl != "") {
                    cellitem.image = {
                        "accessibilityText": imgalt,
                        "url": imageurl
                    };
                }
                googleItem.basicCard = cellitem;
                this.googlePayload.richResponse.items.push(googleItem);
            }
            else {
                let googleItem = new webhook_payload_1.GoogleItem();
                let cellitem = new webhook_payload_1.GoogleBasicCard();
                cellitem.imageDisplayOptions = "CROPPED";
                cellitem.title = title;
                cellitem.subtitle = subtitle;
                cellitem.buttons = [
                    {
                        "title": buttontitle,
                        "openUrlAction": {
                            "url": buttonurl
                        }
                    }
                ];
                if (imageurl != null && imageurl != "") {
                    cellitem.image = {
                        "accessibilityText": imgalt,
                        "url": imageurl
                    };
                }
                googleItem.basicCard = cellitem;
                this.googlePayload.richResponse.items.push(googleItem);
            }
        }
    }
    /**
     * Add Google transaction request intent
     *
     * @param {*} transactionName
     * @param {*} merchantOrderId
     * @param {GoogleTransactionBuyerInfo} buyerInfo
     * @param {GoogleTransactionMerchant} merchantInfo
     * @param {GoogleTransactionalLineItem[]} lineItmes
     * @memberof WebhookResponse
     */
    addGoogleTransactionDecisionRequest(transactionName, merchantOrderId, buyerInfo, merchantInfo, lineItmes) {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google") {
            if (!this.googlePayload.systemIntent) {
                this.googlePayload.systemIntent = new webhook_payload_1.GoogleTransactionDecisionIntent();
                let data = new webhook_payload_1.GoogleTransactionDecisionData(transactionName);
                //Merchant order ID
                data.order.merchantOrderId = merchantOrderId;
                //Buyer details
                data.order.buyerInfo = buyerInfo;
                //Merchant details
                data.order.transactionMerchant = merchantInfo;
                //Content details
                data.order.contents = new webhook_payload_1.GoogleTransactionalContents();
                lineItmes.forEach(lineItem => {
                    data.order.contents.lineItems.push(lineItem);
                });
                this.googlePayload.systemIntent.data = data;
            }
        }
    }
    /**
     * Add Google transaction order update card
     *
     * @param {*} reason
     * @param {*} order
     * @memberof WebhookResponse
     */
    addGoogleOrderUpdate(reason, order) {
        if (this.webhookRequest.getOriginalDetectIntentRequest() == "google" && this.webhookRequest.isScreenDevice()) {
            if (!this.googlePayload.richResponse.items) {
                this.googlePayload.richResponse.items = [];
            }
            let googleItem = new webhook_payload_1.GoogleItem();
            googleItem.structuredResponse = new webhook_payload_1.GoogleStructuredResponse();
            googleItem.structuredResponse.orderUpdateV3 = new webhook_payload_1.GoogleOrderUpdate(reason);
            googleItem.structuredResponse.orderUpdateV3.order = order;
            this.googlePayload.richResponse.items.push(googleItem);
        }
    }
    /**
     * Generate webhook payload.
     *
     * @returns
     * @memberof WebhookResponse
     */
    generatePayload() {
        let response = {};
        response.responses = null;
        response.google = this.removeTypeFromResponse(this.googlePayload); // used for GA/GH responses
        response.actionPayload = this.removeTypeFromResponse(this.webhookPayload.messages.find((a) => a.type == 'action')); //used for webhook payloads for frontends
        return response;
    }
    /**
     *
     * Utility cleanup function
     * @private
     * @param {*} message
     * @returns
     * @memberof WebhookResponse
     */
    removeTypeFromResponse(message) {
        if (!message) {
            return null;
        }
        delete message['type'];
        if (!message.richResponse) {
            return message;
        }
        if (!message.richResponse) {
            return message;
        }
        if (message.richResponse.items && message.richResponse.items.length == 0) {
            delete message.richResponse['items'];
        }
        if (message.richResponse.suggestions && message.richResponse.suggestions.length == 0) {
            delete message.richResponse['suggestions'];
        }
        return message;
    }
    /**
     * Return fulfillment text
     *
     * @returns
     * @memberof WebhookResponse
     */
    getFulfillmentText() {
        let firstMessage = this.dfMessages[0];
        if (firstMessage && firstMessage.text && firstMessage.text.text[0]) {
            let text = firstMessage.text.text[0] || "";
            text = firstMessage.text.text[0].includes("#") ? this.updateVehicleNameInResponseGoogle(text) : "";
            return text;
        }
        else if (firstMessage instanceof df_card_1.default) {
            return firstMessage.title || "";
        }
        else if (firstMessage instanceof message_payload_1.CustomQuickReplies) {
            return "";
        }
    }
    /**
     * Return fulfillment text
     *
     * @param {number} number
     * @returns
     * @memberof WebhookResponse
     */
    getFulfillmentTextAll(number) {
        console.log();
        let msg = "";
        for (let i = 0; i < number; i++) {
            let firstMessage = this.dfMessages[i];
            if (firstMessage && firstMessage.text) {
                if (firstMessage.text.text[0] != undefined) {
                    msg = msg + "\n" + firstMessage.text.text[0];
                }
            }
        }
        if (this.webhookRequest.isWhatsappRequest() || this.webhookRequest.getOriginalDetectIntentRequest() == 'google') {
            msg = this.getGoogleWhatsappBotAnswer();
        }
        return msg.trim();
    }
    getGoogleWhatsappBotAnswer() {
        let msg = "";
        let message;
        let carouselflag = 0;
        let n = false;
        let googleRichResponses = this.googlePayload.richResponse;
        let constsuggestionsText = googleRichResponses.suggestions ? googleRichResponses.suggestions.map(a => {
            return `\n${a.title}`;
        }).join(",") : "";
        let messagearr = [];
        if (googleRichResponses.items && googleRichResponses.items.length > 0) {
            //let lastelement=googleRichResponses.items[googleRichResponses.items.length-1]
            googleRichResponses.items.forEach(function (a, idx, array) {
                if (a.simpleResponse) {
                    message = a.simpleResponse.displayText;
                }
                if (a.carouselBrowse) {
                    carouselflag = 1;
                    let carouselitems = a.carouselBrowse.items;
                    carouselitems.forEach(function (carouselitem) {
                        let carouselmsg = '';
                        carouselmsg = `${carouselitem.title}`;
                        messagearr.push(carouselmsg);
                    });
                }
                if (idx === array.length - 1 && carouselflag == 0) {
                    message = message + constsuggestionsText;
                }
                if (carouselflag == 0) {
                    messagearr.push(message);
                }
            });
        }
        for (const message of messagearr) {
            msg = msg + message;
        }
        return msg;
    }
    /**
     *
     * @private
     * @returns response messages
     * @memberof WebhookResponse
     */
    getFulfillmentMsgs() {
        this.dfMessages.push(this.zohoResponse); //add zoho salesiq response
        return this.dfMessages;
    }
    /**
     * Add runtime session entities
     *
     * @param {string} entityName
     * @param {ISessisonEntity[]} entityValues
     * @param {string} [entityOverrideMode='ENTITY_OVERRIDE_MODE_OVERRIDE']
     * @memberof WebhookResponse
     */
    addSeesionEntityType(entityName, entityValues, entityOverrideMode = 'ENTITY_OVERRIDE_MODE_OVERRIDE') {
        let sessionEntityType = {
            name: `${this.webhookRequest.getSessionId()}/entityTypes/${entityName}`,
            entities: entityValues,
            entityOverrideMode: entityOverrideMode
        };
        let prevEntity = this.sessionEntityTypes.find(a => a.name == `${this.webhookRequest.getSessionId()}/entityTypes/${entityName}`);
        if (!prevEntity) { //Add new entity
            this.sessionEntityTypes.push(sessionEntityType);
        }
        else { //update entity
            prevEntity.entities = sessionEntityType.entities;
            prevEntity.entityOverrideMode = sessionEntityType.entityOverrideMode;
        }
    }
    /**
     * @returns session entity types
     * @memberof WebhookResponse
     */
    getSessionEntityTypes() {
        return this.sessionEntityTypes;
    }
    /**
     * @param {IOutputContext[]} [outputContext=[]]
     * @param {*} [followupEvent={}]
     * @returns webhook response JSON
     * @memberof WebhookResponse
     */
    createResponse(outputContext = [], followupEvent = {}) {
        return {
            "fulfillmentText": this.getFulfillmentTextAll(3),
            "sessionEntityTypes": this.getSessionEntityTypes(),
            "fulfillmentMessages": this.getFulfillmentMsgs(),
            "source": "example.com",
            "payload": this.generatePayload(),
            "outputContexts": outputContext,
            "followupEventInput": followupEvent
        };
    }
}
exports.default = WebhookResponse;
class PLATFORM {
}
exports.PLATFORM = PLATFORM;
PLATFORM.FACEBOOK = 'FACEBOOK';
PLATFORM.UNKNOWN = "Unknown"; //This is not to add 'FACEBOOK' platfrom in responses where payload is being sent, without modifying GA responses- Specifically used for WYH bot
//# sourceMappingURL=webhook-response.js.map