"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAdditionalPayload = exports.CustomSuggestion = exports.CustomCard = exports.CustomQuickReplies = exports.CustomText = exports.MessagePayloadMessage = void 0;
/**
 * Classes and interfaces for common custom response class
*/
class MessagePayload {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push(message);
    }
}
exports.default = MessagePayload;
class MessagePayloadMessage {
    constructor(platform) {
        this.platform = platform;
    }
}
exports.MessagePayloadMessage = MessagePayloadMessage;
class CustomText extends MessagePayloadMessage {
    constructor(text, platform) {
        super(platform);
        this.text = text;
    }
}
exports.CustomText = CustomText;
class CustomQuickReplies extends MessagePayloadMessage {
    constructor(chips, platform) {
        super(platform);
        this.chips = chips;
    }
}
exports.CustomQuickReplies = CustomQuickReplies;
class CustomCard extends MessagePayloadMessage {
    constructor(cards, platform) {
        super(platform);
        this.cards = cards;
    }
}
exports.CustomCard = CustomCard;
class CustomSuggestion extends MessagePayloadMessage {
    constructor(suggestion, platform) {
        super(platform);
        this.suggestion = suggestion;
    }
}
exports.CustomSuggestion = CustomSuggestion;
class CustomAdditionalPayload extends MessagePayloadMessage {
    constructor(action, data, platform) {
        super(platform);
        this.action = action;
        this.data = data;
    }
}
exports.CustomAdditionalPayload = CustomAdditionalPayload;
//# sourceMappingURL=message-payload.js.map