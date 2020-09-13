/**
 * Classes and interfaces for SalesIQ responses
*/

export class SalesIQResponse{
    payload
}

export class SalesIQMessage{
    platform:string='ZOHOSALESIQ'
    action:string
    replies:SalesIQReplies[]
    suggestions:string[]
    input:SalesIQInput
    payload:SalesIQPayload
    otheractions: OtherAction[]
    dislikeactions: OtherAction[]
    constructor(){
    }
}

export class OtherAction{
    text:string;
    action:string;
    constructor(){
        
    }
}

export class SalesIQInput{
    type='select'
    options:string[];
    title
    value
    placeholder
    error
    lat: string
    select_label: string
    lng: string
    label: string
    constructor(){
        this.options=[]
        this.title=null
        this.type='select'
        this.value=''
        this.placeholder=''
        this.error=[]
        this.lat=''
        this.lng=''
        this.select_label=''
        this.label=''

    }
}


export class SalesIQReplies{
   text:string
   image:string
   links:string[]
   type:string
}

export class SalesIQActionButton{
    text:string
    action:string
 }

 export class SalesIQPayload{
    action :string;
    data:any;
    constructor(action,data){
        this.action=action;
        this.data=data
    }
 }
 