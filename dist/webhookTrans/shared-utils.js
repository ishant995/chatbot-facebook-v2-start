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
exports.sendFallbackMail = exports.SlotUpdatedRequest = exports.convertTime = exports.convertDate = exports.updateSlotValueInRequestEnvelope = void 0;
const moment = require("moment");
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mobilitycoemahindra@gmail.com',
        pass: 'mahindramcoe'
    }
});
/**
* Update slot value in request for alexa skill
*
* @param {*} request
* @param {*} slotName
* @param {*} slotValue
* @returns
*/
exports.updateSlotValueInRequestEnvelope = (request, slotName, slotValue) => {
    const slot = request.intent.slots[slotName] || null;
    if (slot) {
        if (!slot.resolutions) { //Without entity resolution
            slot.value = slotValue;
        }
        else { //with entity resolution
            slot.resolutions.resolutionsPerAuthority[0].values[0].value.name = slotValue;
        }
    }
    else {
        request.intent.slots[slotName] = {};
        request.intent.slots[slotName]['name'] = slotName;
        request.intent.slots[slotName]['value'] = slotValue;
        request.intent.slots[slotName]['confirmationStatus'] = "NONE";
    }
    return request;
};
/**
 * Convert YYYY-MM-DD to DD/MM/YYYY
 */
exports.convertDate = (dateStr) => {
    if (dateStr != null) {
        const firstSlashIndex = dateStr.indexOf("-");
        if (firstSlashIndex == 3) { //YYYY-MM-DD
            return moment(dateStr, "YYYY-MM-DD").format("DD/MM/YYYY");
        }
        else {
            return moment(dateStr).format("DD/MM/YYYY");
        }
    }
    else {
        return null;
    }
};
/**
 * Convert time to HH:mm to hh:mm A
 */
exports.convertTime = (timeStr, format = "hh:mm A") => {
    if (timeStr != null) {
        return moment(timeStr, "HH:mm").format(format);
    }
    else {
        return null;
    }
};
class SlotUpdatedRequest {
    constructor(request) {
        this.request = request;
    }
}
exports.SlotUpdatedRequest = SlotUpdatedRequest;
exports.sendFallbackMail = (name, mobilenumber, sessionID, type = '') => __awaiter(void 0, void 0, void 0, function* () {
    let toList = process.env.FALLBACK_MAIL_TO_WHATSAPP;
    let ccList = process.env.FALLBACK_MAIL_TO_CC_WHATSAPP;
    if (process.env.Environment == 'production') {
        toList = process.env.FALLBACK_MAIL_TO_WHATSAPP;
        ccList = process.env.FALLBACK_MAIL_TO_CC_WHATSAPP;
    }
    try {
        let subject = `Fallback Details`;
        if (type == 'HC') {
            subject = `Talk to Human Expert request`;
        }
        let html = `<div id="chat_details" style="width:100%;">
    <h3>Chat Session Details:</h3>
    <table border="1" width="100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
    <td><strong>Customer Name:</strong></td>
    <td>${name}</td>
    </tr>
    <tr>
    <td><strong>Customer Mobile Number:</strong></td>
    <td>${mobilenumber}</td>
    </tr>
    <tr>
    <td><strong>Date &amp; Time:</strong></td>
    <td>${moment().format("DD/MM/YYYY")}</td>
    </tr>
    <tr>
    <td><strong>Session ID:</strong></td>
    <td>${sessionID}</td>
    </tr>
    </tbody>
    </table>
    </div>`;
        let sessionref = ``;
        html = html + sessionref;
        const mailOptions = {
            from: 'mobilitycoemahindra@gmail.com',
            to: toList,
            cc: ccList,
            subject: subject,
            html: html
        };
        if (process.env.Environment == "development" || process.env.Environment == "uat" || process.env.Environment == "production") {
            if (transporter.sendMail(mailOptions)) {
                console.log("Mail Sent");
            }
            else {
                console.log("Error while sending mail");
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});
//# sourceMappingURL=shared-utils.js.map