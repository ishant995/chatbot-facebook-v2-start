/**
 * Classes and interfaces for common custom response class
*/
export default class MessagePayload {
     messages;
    constructor(){
        this.messages = []
    }

    add(message: MessagePayloadMessage) {
        this.messages.push(message)
    }

}

export class MessagePayloadMessage{
    platform: string

    constructor(platform:string){
        this.platform=platform
    }
}


export class CustomText extends MessagePayloadMessage {
    text: string

    constructor(text:string,platform:string){
        super(platform)
        this.text=text
    }

}

export class CustomQuickReplies extends MessagePayloadMessage {
    chips: string[]

    constructor(chips:string[],platform:string){
        super(platform)
        this.chips=chips
    }
}

export class CustomCard extends MessagePayloadMessage {
    cards: ICustomCards[]

    constructor(cards:ICustomCards[],platform:string){
        super(platform)
        this.cards=cards
    }

}

export class CustomSuggestion extends MessagePayloadMessage {
    suggestion: string[]

    constructor(suggestion:string[],platform:string){
        super(platform)
        this.suggestion=suggestion
    }
}
export class CustomAdditionalPayload extends MessagePayloadMessage {
    action:string
    data: any

    constructor(action:string,data:any,platform:string){
        super(platform)
        this.action=action
        this.data=data
    }
}

export interface ICustomCard {
    cards?: (ICustomCards)[] | null;
}
export interface ICustomCards {
    title: string;
    subtitle: string;
    image: string;
    desc: string;
    buttons?: (ICustomCardButton)[] | null;
}
export interface ICustomCardButton {
    type: string;
    text?: string | null;
    url?: string | null;
}
