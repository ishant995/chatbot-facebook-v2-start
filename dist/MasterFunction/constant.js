"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Set FUNCTION_URL and DOT_NET_URL fro local environment
*/
if (process.env.Environment == "local") {
    process.env.FUNCTION_URL = 'https://fntrinitybot-dev.azurewebsites.net';
}
let SERVICE_BOOKING = { action: 'serviceModule', functionURL: `${process.env.FUNCTION_URL}/api/ServiceBooking` };
class Constant {
}
exports.default = Constant;
Constant.FUNCTIONS = {
    SERVICE_BOOKING: SERVICE_BOOKING
};
//# sourceMappingURL=constant.js.map