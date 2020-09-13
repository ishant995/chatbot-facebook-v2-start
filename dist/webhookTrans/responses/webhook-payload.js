"use strict";
/**
 * Classes and interfaces for Google Assistance and Google Home responses
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISystemIntentData = exports.ISystemIntent = exports.IGoogle = exports.IPostalAddress = exports.GoogleTransactionalImage = exports.ILatLng = exports.GoogleTransactionLocation = exports.GoogleTransactionPhoneNumber = exports.GoogleTransactionalTime = exports.GoogleTransactionalReservationItemExtension = exports.GoogleTransactionalLineItem = exports.GoogleTransactionalContents = exports.GoogleTransactionMerchant = exports.GoogleTransactionBuyerInfo = exports.GoogleTransactionIntentData = exports.GoogleTransactionDecisionData = exports.GoogleTransactionDecisionIntent = exports.GoogleSignInData = exports.GoogleSignInIntent = exports.GooglePermissionData = exports.GooglePermissionIntent = exports.GoogleListItem = exports.GoogleListData = exports.GoogleListIntent = exports.GoogleSystemIntent = exports.GoogleLinkOutSuggestion = exports.GoogleSuggestion = exports.GoogleOpenUrlAction = exports.GoogleButtonItems = exports.GoogleImage = exports.GoogleTableCardsHeader = exports.GoogleTableCardsItemCell = exports.GoogleTableCardsItem = exports.GoogleTableCards = exports.GoogleCarouselItem = exports.GoogleCarousel = exports.GoogleBasicCard = exports.GoogleOrderUpdate = exports.GoogleStructuredResponse = exports.GoogleSimpleResponse = exports.GoogleItem = exports.GoogleRichResponse = exports.Google = exports.PayloadActionResponse = exports.WebhookPayloadMessage = void 0;
class WebhookPayload {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push(message);
    }
}
exports.default = WebhookPayload;
class WebhookPayloadMessage {
    constructor(type) {
        this.type = '';
        this.type = type;
    }
}
exports.WebhookPayloadMessage = WebhookPayloadMessage;
//Actions on PayloadAction payload
class PayloadActionResponse extends WebhookPayloadMessage {
    constructor(action, data) {
        super('action');
        this.webhookaPayloadAction = action,
            this.data = data;
    }
}
exports.PayloadActionResponse = PayloadActionResponse;
//Actions on Google payload
class Google extends WebhookPayloadMessage {
    constructor() {
        super('google');
        this.richResponse = new GoogleRichResponse();
    }
}
exports.Google = Google;
class GoogleRichResponse {
    constructor() {
        this.items = [];
        this.suggestions = [];
    }
}
exports.GoogleRichResponse = GoogleRichResponse;
class GoogleItem {
    constructor() {
        // this.simpleResponse = new GoogleSimpleResponse()
        // this.basicCard = new GoogleBasicCard()
        // this.carouselBrowse=new GoogleCarousel()
    }
}
exports.GoogleItem = GoogleItem;
class GoogleSimpleResponse {
}
exports.GoogleSimpleResponse = GoogleSimpleResponse;
class GoogleStructuredResponse {
}
exports.GoogleStructuredResponse = GoogleStructuredResponse;
class GoogleOrderUpdate {
    constructor(reason) {
        this.type = "SNAPSHOT";
        this.reason = reason;
    }
}
exports.GoogleOrderUpdate = GoogleOrderUpdate;
class GoogleBasicCard {
    constructor() {
        this.buttons = [];
        this.image = new GoogleImage();
    }
}
exports.GoogleBasicCard = GoogleBasicCard;
class GoogleCarousel {
}
exports.GoogleCarousel = GoogleCarousel;
class GoogleCarouselItem {
}
exports.GoogleCarouselItem = GoogleCarouselItem;
class GoogleTableCards {
    constructor() {
        this.rows = [];
        this.columnProperties = [];
    }
}
exports.GoogleTableCards = GoogleTableCards;
class GoogleTableCardsItem {
    constructor() {
        this.cells = [];
        this.dividerAfter = true;
    }
}
exports.GoogleTableCardsItem = GoogleTableCardsItem;
class GoogleTableCardsItemCell {
    constructor() {
        this.text = '';
    }
}
exports.GoogleTableCardsItemCell = GoogleTableCardsItemCell;
class GoogleTableCardsHeader {
    constructor() {
        this.header = '';
    }
}
exports.GoogleTableCardsHeader = GoogleTableCardsHeader;
class GoogleImage {
}
exports.GoogleImage = GoogleImage;
class GoogleButtonItems {
    constructor() {
        this.openUrlAction = new GoogleOpenUrlAction();
    }
}
exports.GoogleButtonItems = GoogleButtonItems;
class GoogleOpenUrlAction {
    constructor() { }
}
exports.GoogleOpenUrlAction = GoogleOpenUrlAction;
class GoogleSuggestion {
    constructor() { }
}
exports.GoogleSuggestion = GoogleSuggestion;
class GoogleLinkOutSuggestion {
    constructor(destinationName, url) {
        this.destinationName = destinationName;
        this.url = url;
        this.openUrlAction = new GoogleOpenUrlAction();
        this.openUrlAction.url = url;
    }
}
exports.GoogleLinkOutSuggestion = GoogleLinkOutSuggestion;
class GoogleSystemIntent {
    constructor(intent) {
        this.intent = "";
        this.intent = intent;
    }
}
exports.GoogleSystemIntent = GoogleSystemIntent;
class GoogleListIntent extends GoogleSystemIntent {
    constructor() {
        super('actions.intent.OPTION');
    }
}
exports.GoogleListIntent = GoogleListIntent;
class GoogleListData {
    constructor(title) {
        this["@type"] = "type.googleapis.com/google.actions.v2.OptionValueSpec";
        this.listSelect = {
            title: title,
            items: null
        };
    }
}
exports.GoogleListData = GoogleListData;
class GoogleListItem {
}
exports.GoogleListItem = GoogleListItem;
class GooglePermissionIntent extends GoogleSystemIntent {
    constructor() {
        super('actions.intent.PERMISSION');
    }
}
exports.GooglePermissionIntent = GooglePermissionIntent;
class GooglePermissionData {
    constructor(permissionReason, permissionData) {
        this["@type"] = "type.googleapis.com/google.actions.v2.PermissionValueSpec";
        this.optContext = "To address you by name and know your location";
        this.permissions = [
            "DEVICE_PRECISE_LOCATION"
        ];
        this.optContext = permissionReason;
        if (permissionData) {
            this.permissions = permissionData;
        }
    }
}
exports.GooglePermissionData = GooglePermissionData;
class GoogleSignInIntent extends GoogleSystemIntent {
    constructor() {
        super('actions.intent.SIGN_IN');
        this.data = new GoogleSignInData();
    }
}
exports.GoogleSignInIntent = GoogleSignInIntent;
class GoogleSignInData {
    constructor() {
        this["@type"] = "type.googleapis.com/google.actions.v2.SignInValueSpec";
    }
}
exports.GoogleSignInData = GoogleSignInData;
//Transaction Decision Intent
class GoogleTransactionDecisionIntent extends GoogleSystemIntent {
    constructor() {
        super('actions.intent.TRANSACTION_DECISION');
        // this.data = new GoogleTransactionDecisionData()
    }
}
exports.GoogleTransactionDecisionIntent = GoogleTransactionDecisionIntent;
class GoogleTransactionDecisionData {
    constructor(actionDisplayName = "SCHEDULE") {
        this["@type"] = "type.googleapis.com/google.actions.transactions.v3.TransactionDecisionValueSpec";
        this.order = new GoogleTransactionIntentData();
        this.orderOptions = {
            requestDeliveryAddress: "false"
        };
        this.presentationOptions = {
            actionDisplayName: "SCHEDULE"
        };
        this.presentationOptions.actionDisplayName = actionDisplayName;
    }
}
exports.GoogleTransactionDecisionData = GoogleTransactionDecisionData;
class GoogleTransactionIntentData {
    constructor() { }
}
exports.GoogleTransactionIntentData = GoogleTransactionIntentData;
class GoogleTransactionBuyerInfo {
    constructor() { }
}
exports.GoogleTransactionBuyerInfo = GoogleTransactionBuyerInfo;
class GoogleTransactionMerchant {
    constructor(name) {
        this.name = name;
    }
}
exports.GoogleTransactionMerchant = GoogleTransactionMerchant;
class GoogleTransactionalContents {
    constructor() {
        this.lineItems = [];
    }
}
exports.GoogleTransactionalContents = GoogleTransactionalContents;
class GoogleTransactionalLineItem {
    constructor(id, name, image, description, notes) {
        this.id = id;
        this.name = name;
    }
}
exports.GoogleTransactionalLineItem = GoogleTransactionalLineItem;
class GoogleTransactionalReservationItemExtension {
    constructor(userVisibleStatusLabel, status = "PENDING") {
        this.type = "RESERVATION_TYPE_UNSPECIFIED";
        this.status = status;
        this.userVisibleStatusLabel = userVisibleStatusLabel;
    }
}
exports.GoogleTransactionalReservationItemExtension = GoogleTransactionalReservationItemExtension;
class GoogleTransactionalTime {
    constructor(timeStr) {
        this.timeIso8601 = timeStr;
    }
}
exports.GoogleTransactionalTime = GoogleTransactionalTime;
class GoogleTransactionPhoneNumber {
    constructor() { }
}
exports.GoogleTransactionPhoneNumber = GoogleTransactionPhoneNumber;
class GoogleTransactionLocation {
    constructor() { }
}
exports.GoogleTransactionLocation = GoogleTransactionLocation;
class ILatLng {
    constructor() { }
}
exports.ILatLng = ILatLng;
class GoogleTransactionalImage {
    constructor() { }
}
exports.GoogleTransactionalImage = GoogleTransactionalImage;
class IPostalAddress {
    constructor() { }
}
exports.IPostalAddress = IPostalAddress;
class IGoogle {
}
exports.IGoogle = IGoogle;
class ISystemIntent {
    constructor(contextstring, notification) {
        this.intent = "actions.intent.NEW_SURFACE";
        this.data = new ISystemIntentData(contextstring, notification);
    }
}
exports.ISystemIntent = ISystemIntent;
class ISystemIntentData {
    constructor(contextstring, notification) {
        this["@type"] = "type.googleapis.com/google.actions.v2.NewSurfaceValueSpec";
        this.capabilities = [];
        this.capabilities.push("actions.capability.SCREEN_OUTPUT");
        this.context = contextstring; //"Let's move you to a screen device for cards and other visual responses"
        this.notificationTitle = notification; //"Try your Action here!"
    }
}
exports.ISystemIntentData = ISystemIntentData;
//# sourceMappingURL=webhook-payload.js.map