import { constant } from "../sharedConstant/constant"
import { Context, HttpRequest } from "@azure/functions"  
const axios = require('axios');
import * as tunnel from 'tunnel';

const agent1 = tunnel.httpsOverHttp({
    proxy: {
        //host: constant.SERVICECONSTANT.PROXYHOST,
       // port: constant.SERVICECONSTANT.PROXYPORT,
    },
});

export default class Service {
    protected config = {
        //httpsAgent: agent1,
        //proxy:false,
        //headers: {'Ocp-Apim-Subscription-Key': constant.OCP_SUBSCRIPTION_KEY,'Content-Type':'application/json'}
    }

    

    // getLocationWiseModels = async (locationCode = 'KDE') => {
    //     let url=constant.PRESALES_BASE_URL+"/"+constant.PRESALES_METHODS.GET_LOCATIONWISE_MODELS+"?locationCode="+locationCode;
    //     const apipool = await new Promise((resolve, reject) => {
    //             try{
    //                 axios.get(url,this.config)
    //                 .then((response)=> { 
    //                     if (response.data.IsSuccessful) {
    //                         resolve(response.data.ResponseData)
    //                     } else {
    //                         reject(response.data)
    //                     }
    //                 })
    //                 .catch((error)=>{
    //                     reject(error)
    //                 });
    //             }
    //             catch(e)
    //             {
    //                 reject()
    //             }
    //     })
    //     return apipool;
    // }

    
}