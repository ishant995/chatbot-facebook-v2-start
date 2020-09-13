"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model class for Dialogflow card
*/
class DFCard {
    constructor(card, platform) {
        this.title = "";
        this.subtitle = "";
        this.text = "";
        this.imageUrl = "";
        this.buttonText = "";
        this.buttonUrl = "";
        this.platform = "";
        if (card === undefined || (typeof card === 'object' && !card.title)) {
            throw new Error('title string required by Card constructor');
        }
        if (typeof card === 'string') {
            this.title = card;
        }
        else if (typeof card === 'object') {
            this.title = card.title;
            this.text = card.text;
            this.imageUrl = card.imageUrl;
            this.buttonText = card.buttonText;
            this.buttonUrl = card.buttonUrl;
            this.platform = platform;
        }
    }
    /**
     * return JSON data from class object
    */
    getJSON() {
        return {
            card: {
                title: this.title,
                subtitle: this.text,
                imageUri: this.imageUrl,
                buttons: [
                    {
                        text: this.buttonText,
                        postback: this.buttonUrl
                    }
                ]
            },
            platform: this.platform
        };
    }
}
exports.default = DFCard;
//# sourceMappingURL=df-card.js.map