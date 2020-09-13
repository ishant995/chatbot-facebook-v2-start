
/**
 * Classes and interfaces for Google Assistance and Google Home responses
*/

export default class WebhookPayload {
    messages: WebhookPayloadMessage[]
    constructor() {
        this.messages = []
    }
    add(message) {
        this.messages.push(message)
    }

}

export class WebhookPayloadMessage {
    type: string = ''
    constructor(type?: string) {
        this.type = type
    }
}

//Actions on PayloadAction payload
export class PayloadActionResponse extends WebhookPayloadMessage {
    webhookaPayloadAction: string;
    data: any;
    constructor(action, data) {
        super('action');
        this.webhookaPayloadAction = action,
            this.data = data
    }
}

//Actions on Google payload
export class Google extends WebhookPayloadMessage {
    public expectUserResponse: boolean;
    public richResponse: GoogleRichResponse;
    public systemIntent: GoogleListIntent | GooglePermissionIntent | GoogleSignInIntent | GoogleTransactionDecisionIntent;
    constructor() {
        super('google')
        this.richResponse = new GoogleRichResponse()
        
    }

}
export class GoogleRichResponse {
    items?: GoogleItem[]
    suggestions?: GoogleSuggestion[]
    linkOutSuggestion?: GoogleLinkOutSuggestion

    constructor() {
        this.items = []
        this.suggestions = []
    }
}
export class GoogleItem {
    simpleResponse?: GoogleSimpleResponse;
    basicCard?: GoogleBasicCard;
    carouselBrowse?: GoogleCarousel;
    tableCard?: GoogleTableCards;
    structuredResponse?:GoogleStructuredResponse
    constructor() {
        // this.simpleResponse = new GoogleSimpleResponse()
        // this.basicCard = new GoogleBasicCard()
        // this.carouselBrowse=new GoogleCarousel()
    }
}
export class GoogleSimpleResponse {
    textToSpeech: string;
    ssml: string;
    displayText: string
}
export class GoogleStructuredResponse {
    orderUpdateV3: GoogleOrderUpdate
}
export class GoogleOrderUpdate {
    type="SNAPSHOT"
    reason:string
    order:any
    constructor(reason){
        this.reason=reason
    }
}

export class GoogleBasicCard {
    title: string;
    subtitle: string;
    formattedText: string;
    image: GoogleImage;
    buttons: GoogleButtonItems[];
    imageDisplayOptions: string;

    constructor() {
        this.buttons = []
        this.image = new GoogleImage()
    }
}

export class GoogleCarousel {
    items: GoogleCarouselItem[]
}

export class GoogleCarouselItem {
    title: string
    openUrlAction?: {
        url: string
    }
    description?: string
    footer?: string
    image?: GoogleImage
}

export class GoogleTableCards {
    rows: GoogleTableCardsItem[]
    columnProperties: GoogleTableCardsHeader[]

    constructor() {
        this.rows = []
        this.columnProperties = []
    }
}

export class GoogleTableCardsItem {
    cells: GoogleTableCardsItemCell[]
    dividerAfter: boolean;
    constructor() {
        this.cells = []
        this.dividerAfter = true
    }
}

export class GoogleTableCardsItemCell {
    text: string;


    constructor() {
        this.text = ''

    }
}

export class GoogleTableCardsHeader {
    header: string

    constructor() {
        this.header = ''
    }
}

export class GoogleImage {
    url: string;
    accessibilityText: string;
}
export class GoogleButtonItems {
    title: string;
    openUrlAction: GoogleOpenUrlAction;
    constructor() {
        this.openUrlAction = new GoogleOpenUrlAction()
    }
}
export class GoogleOpenUrlAction {
    url: string;
    constructor() { }
}

export class GoogleSuggestion {
    title: string;
    constructor() { }
}

export class GoogleLinkOutSuggestion {
    destinationName: string;
    openUrlAction: GoogleOpenUrlAction
    url: string;
    constructor(destinationName,url){
        this.destinationName=destinationName
        this.url=url
        this.openUrlAction=new GoogleOpenUrlAction()
        this.openUrlAction.url=url
    }
}

export class GoogleSystemIntent {
    intent = ""
    constructor(intent) {
        this.intent = intent
    }
}

export class GoogleListIntent extends GoogleSystemIntent {
    data: GoogleListData
    constructor() {
        super('actions.intent.OPTION')
    }
}

export class GoogleListData {
    "@type" = "type.googleapis.com/google.actions.v2.OptionValueSpec"
    listSelect: {
        title: string   //List Title
        items: GoogleListItem[]
    }

    constructor(title) {
        this.listSelect = {
            title: title,
            items: null
        }
    }
}
export class GoogleListItem {
    title: string
    description: string
    optionInfo: any
}

export class GooglePermissionIntent extends GoogleSystemIntent {
    data: GooglePermissionData
    constructor() {
        super('actions.intent.PERMISSION')
    }
}
export class GooglePermissionData {
    "@type" = "type.googleapis.com/google.actions.v2.PermissionValueSpec"
    optContext = "To address you by name and know your location"
    permissions = [
        "DEVICE_PRECISE_LOCATION"
    ]
    constructor(permissionReason?,permissionData?) {
        this.optContext = permissionReason
        if(permissionData){
            this.permissions=permissionData
        }
    }
}

export class GoogleSignInIntent extends GoogleSystemIntent {
    data: GoogleSignInData
    constructor() {
        super('actions.intent.SIGN_IN')
        this.data = new GoogleSignInData()
    }
}

export class GoogleSignInData {
    "@type" = "type.googleapis.com/google.actions.v2.SignInValueSpec"
    constructor() {
    }
}

//Transaction Decision Intent
export class GoogleTransactionDecisionIntent extends GoogleSystemIntent {
    data: GoogleTransactionDecisionData
    constructor() {
        super('actions.intent.TRANSACTION_DECISION')
        // this.data = new GoogleTransactionDecisionData()
    }
}
export class GoogleTransactionDecisionData {
    "@type" = "type.googleapis.com/google.actions.transactions.v3.TransactionDecisionValueSpec"
    order=new GoogleTransactionIntentData()
    orderOptions={
        requestDeliveryAddress: "false"
    }
    presentationOptions= {
        actionDisplayName: "SCHEDULE"
    }
    constructor(actionDisplayName="SCHEDULE") {
        this.presentationOptions.actionDisplayName=actionDisplayName
    }
}

export class GoogleTransactionIntentData {
    merchantOrderId:string
    userVisibleOrderId?:string
    buyerInfo: GoogleTransactionBuyerInfo
    transactionMerchant: GoogleTransactionMerchant
    contents: GoogleTransactionalContents
    constructor(){}

}

export class GoogleTransactionBuyerInfo {
    email: string
    firstName: string
    lastName?: string
    displayName: string
    phoneNumbers?: GoogleTransactionPhoneNumber[]
    constructor(){}
}
export class GoogleTransactionMerchant {
    id?: string
    name: string
    image?: GoogleTransactionalImage
    phoneNumbers?: GoogleTransactionPhoneNumber[]
    address?: GoogleTransactionLocation
    constructor(name){
        this.name=name
    }
}
export class GoogleTransactionalContents {
    lineItems: GoogleTransactionalLineItem[]
    constructor(){
        this.lineItems=[]  
    }
}
export class GoogleTransactionalLineItem {
    id: string
    name: string
    image?: GoogleTransactionalImage
    description?: string
    notes?: string[]
    reservation?: GoogleTransactionalReservationItemExtension
    constructor(id,name,image?,description?,notes?){
        this.id=id
        this.name=name
    }
}

export class GoogleTransactionalReservationItemExtension {
    type:string
    status: string//RESERVATION_STATUS_UNSPECIFIED,PENDING,CONFIRMED,CANCELLED,FULFILLED,CHANGE_REQUESTED,REJECTED
    userVisibleStatusLabel: string
    reservationTime?: GoogleTransactionalTime
    confirmationCode?: string
    location?: GoogleTransactionLocation
    extension?: any
    constructor(userVisibleStatusLabel,status="PENDING"){
        this.type="RESERVATION_TYPE_UNSPECIFIED"
        this.status=status
        this.userVisibleStatusLabel=userVisibleStatusLabel
    }
}
export class GoogleTransactionalTime {
    timeIso8601: string
    constructor(timeStr){
        this.timeIso8601=timeStr
    }
}

export class GoogleTransactionPhoneNumber {
    e164PhoneNumber: string
    extension: string
    preferredDomesticCarrierCode: string
    constructor(){}
}

export class GoogleTransactionLocation {
    coordinates: ILatLng
    formattedAddress?: string
    zipCode?: string
    city?: string
    postalAddress?: IPostalAddress
    name?: string
    phoneNumber?: string
    notes?: string
    placeId?: string
    constructor(){}
}

export class ILatLng {
    latitude: number
    longitude: number
    constructor(){}
}
export class GoogleTransactionalImage {
    url: string
    accessibilityText: string
    height?: number
    width?: number
    constructor(){}
}

export class IPostalAddress {
    revision: number
    regionCode: string
    languageCode?: string
    postalCode?: string
    sortingCode?: string
    administrativeArea?: string
    locality?: string
    sublocality?: string
    addressLines?: string[]
    recipients?: string[]
    organization?: string
    constructor(){}
}


//================================================

//Interfaces
export interface IGoogleButtonItems {
    title: string;
    openUrlAction: GoogleOpenUrlAction;
}

export interface IGoogleOpenUrlAction {
    url: string;
}
export interface IGoogleImage {
    url: string;
    accessibilityText: string;
}
export interface IGoogleBasicCard {
    title: string;
    subtitle: string;
    formattedText: string;
    image: IGoogleImage;
    buttons: IGoogleButtonItems[];
    imageDisplayOptions: string;
}

export interface IGoogleSimpleResponse {
    textToSpeech: string;
    ssml: string;
    displayText: string
}
export interface IGoogleItem {
    simpleResponse?: IGoogleSimpleResponse;
    basicCard?: IGoogleBasicCard;
}

export interface IGoogleRichResponse {
    items?: IGoogleItem[]
}

export class IGoogle {
    public expectUserResponse: boolean;
    public richResponse: IGoogleRichResponse;
    public systemIntent:ISystemIntent;
}

export class ISystemIntent{
    public intent:string;
    public data:ISystemIntentData;
    constructor(contextstring:string,notification:string){
        this.intent="actions.intent.NEW_SURFACE"
        this.data=new ISystemIntentData(contextstring,notification)
    }
}

export class ISystemIntentData{
    "@type" = "type.googleapis.com/google.actions.v2.NewSurfaceValueSpec"
    public capabilities:any[]=[];
    public context:string;
    public notificationTitle:string;
    constructor(contextstring:string,notification:string) {
        this.capabilities.push("actions.capability.SCREEN_OUTPUT")
        this.context=contextstring;//"Let's move you to a screen device for cards and other visual responses"
        this.notificationTitle=notification;//"Try your Action here!"
    }
}


