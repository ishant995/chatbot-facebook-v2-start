import moment = require("moment")
const nodemailer = require("nodemailer")
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mobilitycoemahindra@gmail.com',
        pass: 'mahindramcoe'
    }
})
 /**
 * Update slot value in request for alexa skill 
 *
 * @param {*} request
 * @param {*} slotName
 * @param {*} slotValue
 * @returns
 */
export const updateSlotValueInRequestEnvelope = (request, slotName, slotValue) => {

    const slot = request.intent.slots[slotName] || null
    if (slot) {
        if (!slot.resolutions) {  //Without entity resolution
            slot.value = slotValue
        } else { //with entity resolution
            slot.resolutions.resolutionsPerAuthority[0].values[0].value.name = slotValue
        }
    } else {
        request.intent.slots[slotName] = {}
        request.intent.slots[slotName]['name'] = slotName
        request.intent.slots[slotName]['value'] = slotValue
        request.intent.slots[slotName]['confirmationStatus'] = "NONE"
    }
    return request
}

/**
 * Convert YYYY-MM-DD to DD/MM/YYYY
 */
export const convertDate = (dateStr: string) => {
    if (dateStr != null) {
        const firstSlashIndex = dateStr.indexOf("-")
        if (firstSlashIndex == 3) { //YYYY-MM-DD
            return moment(dateStr, "YYYY-MM-DD").format("DD/MM/YYYY")
        } else {
            return moment(dateStr).format("DD/MM/YYYY")
        }
    } else {
        return null
    }
}

/**
 * Convert time to HH:mm to hh:mm A
 */
export const convertTime = (timeStr: string,format="hh:mm A") => {
    if (timeStr != null) {
        return moment(timeStr, "HH:mm").format(format)
    } else {
        return null
    }
}

export class SlotUpdatedRequest {
    request
    constructor(request) {
        this.request = request
    }
}

export const sendFallbackMail = async (name,mobilenumber,sessionID,type='') => {
    let toList=process.env.FALLBACK_MAIL_TO_WHATSAPP;
    let ccList=process.env.FALLBACK_MAIL_TO_CC_WHATSAPP

    if(process.env.Environment=='production'){
        toList=process.env.FALLBACK_MAIL_TO_WHATSAPP
        ccList=process.env.FALLBACK_MAIL_TO_CC_WHATSAPP
    }
    try {
    
    
    let subject:string=`Fallback Details` 
    if(type=='HC'){
        subject=`Talk to Human Expert request`
    }
    let html=`<div id="chat_details" style="width:100%;">
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
    let sessionref=``
    html=html+sessionref;

    const mailOptions = {
        from: 'mobilitycoemahindra@gmail.com', // sender address
        to: toList, // list of receivers
        cc:ccList,
        subject:subject , // Subject line
        html: html
    };

    if (process.env.Environment == "development" || process.env.Environment == "uat" || process.env.Environment == "production") 
    {
    if (transporter.sendMail(mailOptions)) {
        console.log("Mail Sent");
    }else {
        console.log("Error while sending mail");
    }
    }
}
    catch(e){
        console.log(e);
    }
}



