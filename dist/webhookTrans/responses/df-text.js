"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model class for Dialogflow text
*/
class DFText {
    constructor(speechData, platform) {
        this.text = "";
        this.googleText = "";
        this.speech = "";
        this.platform = "";
        if (typeof speechData == 'string') {
            this.text = speechData;
            this.googleText = speechData;
            this.speech = speechData;
        }
        else {
            this.text = speechData.Answer;
            this.googleText = speechData.GoogleAnswer;
            this.speech = speechData.SSMLAnswer;
            if (speechData.image && speechData.image != null) {
                this.image = speechData.image;
            }
            else {
                this.image = '-';
            }
            if (speechData.type && speechData.type != null) {
                this.type = speechData.type;
            }
            else {
                this.type = '-';
            }
            if (speechData.link && speechData.link != null) {
                this.link = speechData.link;
            }
            else {
                this.link = [];
            }
        }
        this.platform = platform;
    }
    /**
     * return JSON data from class object
    */
    getJSON() {
        return {
            text: {
                text: [
                    this.text
                ]
            },
            platform: this.platform
        };
    }
}
exports.default = DFText;
//# sourceMappingURL=df-text.js.map