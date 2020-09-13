
/**
 * Set FUNCTION_URL and DOT_NET_URL fro local environment
*/
if(process.env.Environment=="local"){
    process.env.FUNCTION_URL='https://fntrinitybot-dev.azurewebsites.net'
}


let SERVICE_BOOKING = { action: 'serviceModule', functionURL: `${process.env.FUNCTION_URL}/api/ServiceBooking` }


export default class Constant {
    static FUNCTIONS = {
        SERVICE_BOOKING: SERVICE_BOOKING
    }
}