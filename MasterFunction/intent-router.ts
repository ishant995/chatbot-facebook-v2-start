import { Context, HttpRequest } from "@azure/functions"
import ACTION_NAMES from "./constant";
import Constant from "./constant";

const axios = require('axios');


/**
 * Contains network calls for skill specific functions 
 *
 * @class IntentRouter
 */
class IntentRouter {

    public ctx;
    public req;

    constructor(ctx: Context, req: HttpRequest) {
        this.ctx = ctx;
        this.req = req;
    }

    serviceBooking = async () => {
        return new Promise((resolve, reject) => {
            axios.post(Constant.FUNCTIONS.SERVICE_BOOKING.functionURL, this.req.body)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }
}

export default IntentRouter