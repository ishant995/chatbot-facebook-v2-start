"use strict";
/**
 * Classes and interfaces for SalesIQ responses
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesIQPayload = exports.SalesIQActionButton = exports.SalesIQReplies = exports.SalesIQInput = exports.OtherAction = exports.SalesIQMessage = exports.SalesIQResponse = void 0;
class SalesIQResponse {
}
exports.SalesIQResponse = SalesIQResponse;
class SalesIQMessage {
    constructor() {
        this.platform = 'ZOHOSALESIQ';
    }
}
exports.SalesIQMessage = SalesIQMessage;
class OtherAction {
    constructor() {
    }
}
exports.OtherAction = OtherAction;
class SalesIQInput {
    constructor() {
        this.type = 'select';
        this.options = [];
        this.title = null;
        this.type = 'select';
        this.value = '';
        this.placeholder = '';
        this.error = [];
        this.lat = '';
        this.lng = '';
        this.select_label = '';
        this.label = '';
    }
}
exports.SalesIQInput = SalesIQInput;
class SalesIQReplies {
}
exports.SalesIQReplies = SalesIQReplies;
class SalesIQActionButton {
}
exports.SalesIQActionButton = SalesIQActionButton;
class SalesIQPayload {
    constructor(action, data) {
        this.action = action;
        this.data = data;
    }
}
exports.SalesIQPayload = SalesIQPayload;
//# sourceMappingURL=zoho-responses.js.map