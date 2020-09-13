/**
 * Model class for Dialogflow quick replies
*/
export default class DFQuickReplies {

    quickReplies: string[] = []
    platform: string
    title
    constructor(quickReplies: string[], platform: string, title = null) {
        if (quickReplies === undefined) {
            throw new Error('title string required by Card constructor');
        }
        if (Array.isArray(quickReplies)) {
            this.quickReplies = quickReplies;
            this.platform = platform;
        } else {
            throw new Error('card button requires both title and link');
        }
        if (title && (typeof title == 'object')) {
            this.title = title.Answer
        } else {
            this.title = title
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
        }
    }
}