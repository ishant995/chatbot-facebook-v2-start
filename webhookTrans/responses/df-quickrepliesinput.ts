/**
 * Model class for Dialogflow quick replies
*/
export default class DFQuickRepliesInput {

    quickReplies: string[] = []
    platform: string
    title
    value:string
    placeholder:string
    type:string
    error: string[] = []

    constructor(quickReplies: string[], platform: string, title = null,value='',placeholder='',type='',error=[]) {
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

        this.value=value
        this.placeholder=placeholder
        this.type=type
        this.error=error

       

        
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