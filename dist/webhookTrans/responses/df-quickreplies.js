"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model class for Dialogflow quick replies
*/
class DFQuickReplies {
    constructor(quickReplies, platform, title = null) {
        this.quickReplies = [];
        if (quickReplies === undefined) {
            throw new Error('title string required by Card constructor');
        }
        if (Array.isArray(quickReplies)) {
            this.quickReplies = quickReplies;
            this.platform = platform;
        }
        else {
            throw new Error('card button requires both title and link');
        }
        if (title && (typeof title == 'object')) {
            this.title = title.Answer;
        }
        else {
            this.title = title;
        }
    }
    /**
 * return JSON data from class object
*/
    getJSON() {
        return {
            quickReplies: {
                quickReplies: this.quickReplies
            },
            platform: this.platform
        };
    }
}
exports.default = DFQuickReplies;
//# sourceMappingURL=df-quickreplies.js.map