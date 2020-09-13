"use strict";
// if (!process.env.Environment) {
//     process.env.Environment = 'local'
// }
// var env = process.env.Environment || 'local'
Object.defineProperty(exports, "__esModule", { value: true });
// console.log('environment',process.env.Environment)
// if (env === 'development') {
//     process.env.TD_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_td_sit'
//     process.env.PRESALES_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_presales_sit'
//     process.env.OCP_SUBSCRIPTION_KEY = 'ca3ecee18ad749cd9e8806ad67c0d432'
//     process.env.LMS_BASE_URL = 'https://stglmscrm.m2all.com/service/v4_1/rest.php'
//     process.env.MAP_KEY = 'AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c'
//     process.env.WYH_BASE_URL='https://wyh-dev.azurewebsites.net/api/WYHApi/'
//     process.env.WYH_MAP_KEY='AIzaSyDc5yBOn1wXBkvbthag8aylAQW8ZRWdi-M'
//     process.env.WYH_WEBSITE_URL="https://wyh-uat.azurewebsites.net"
//     process.env.DF_GOOGLE_CLIENT_ACCESS_ID=""
// } else if (env === 'uat') {
//     //TODO: REMOVE PROD APIS and OCP_SUBSCRIPTION_KEY
//     process.env.TD_BASE_URL = 'https://trinitygateway.azure-api.net/syouv2_0_td_prod'
//     process.env.PRESALES_BASE_URL = 'https://trinitygateway.azure-api.net/syouv2_0_presales_prod'
//     process.env.OCP_SUBSCRIPTION_KEY = 'db0cd261fd774df4935527298028f02b'
//     // process.env.TD_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_td_sit'
//     // process.env.PRESALES_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_presales_sit'
//     // process.env.OCP_SUBSCRIPTION_KEY = 'ca3ecee18ad749cd9e8806ad67c0d432'
//     process.env.LMS_BASE_URL='https://stglmscrm.m2all.com/service/v4_1/rest.php'
//     process.env.MAP_KEY='AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c'
//     process.env.WYH_BASE_URL='https://wyh-dev.azurewebsites.net/api/WYHApi/'
//     process.env.WYH_MAP_KEY='AIzaSyDc5yBOn1wXBkvbthag8aylAQW8ZRWdi-M'
//     process.env.WYH_WEBSITE_URL="https://wyh-uat.azurewebsites.net"
//     process.env.DF_GOOGLE_CLIENT_ACCESS_ID=""
// } else if (env === 'production') {
//     process.env.TD_BASE_URL = 'https://trinitygateway.azure-api.net/syouv2_0_td_prod'
//     process.env.PRESALES_BASE_URL = 'https://trinitygateway.azure-api.net/syouv2_0_presales_prod'
//     process.env.OCP_SUBSCRIPTION_KEY = 'db0cd261fd774df4935527298028f02b'
//     process.env.LMS_BASE_URL='https://lmscrm.m2all.com/service/v4_1/rest.php'
//     process.env.MAP_KEY='AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c'
//     process.env.WYH_BASE_URL='https://api.withyouhamesha.com/api/WYHApi/'
//     process.env.WYH_MAP_KEY='AIzaSyDc5yBOn1wXBkvbthag8aylAQW8ZRWdi-M'
//     process.env.WYH_WEBSITE_URL="https://www.withyouhamesha.com"
//     process.env.DF_GOOGLE_CLIENT_ACCESS_ID=""
// }else{ //local
//     process.env.TD_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_td_sit'
//     process.env.PRESALES_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_presales_sit'
//     process.env.OCP_SUBSCRIPTION_KEY = 'ca3ecee18ad749cd9e8806ad67c0d432'
//     process.env.LMS_BASE_URL = 'https://stglmscrm.m2all.com/service/v4_1/rest.php'
//     process.env.MAP_KEY = 'AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c'
//     process.env.DBSERVER='10.192.65.222\\SQLEXPRESS'
//     process.env.DBDATABASENAME='TrinityPVA_UAT'
//     process.env.DBUSER='chetan'
//     process.env.DBPASSWORD='pass,123'
//     process.env.WYH_BASE_URL='https://wyh-dev.azurewebsites.net/api/WYHApi/'
//     process.env.WYH_MAP_KEY='AIzaSyDc5yBOn1wXBkvbthag8aylAQW8ZRWdi-M'
//     process.env.WYH_WEBSITE_URL="https://wyh-uat.azurewebsites.net"
//     process.env.WYHDBSERVER='10.192.65.222\\SQLEXPRESS'
//     process.env.WYHDBDATABASENAME='WYH_UAT'
//     process.env.WYHDBUSER='chetan'
//     process.env.WYHDBPASSWORD='pass,123'
//     process.env.WYH_SMS_AUTH_KEY='137875AojLjnODi5880799f'
//     process.env.DBDATABASENAME_REPORT='BotSessionReports'
//     process.env.DF_GOOGLE_CLIENT_ACCESS_ID=""
//     process.env.VEHICLES="[\r\n{\"name\":\"TUV300\", \"modelcode\":\"TUVN\"},\r\n{\"name\":\"XUV300\", \"modelcode\":\"X300\"},\r\n{\"name\":\"Alturas G4\", \"modelcode\":\"ALTS\"},\r\n{\"name\":\"Marazzo\", \"modelcode\":\"MRZO\"},\r\n{\"name\":\"XUV500\", \"modelcode\":\"XUVN\"},\r\n{\"name\":\"Scorpio\", \"modelcode\":\"SCRN\"},\r\n{\"name\":\"KUV100 NXT\", \"modelcode\":\"KUVN\"},\r\n{\"name\":\"Bolero Power+\", \"modelcode\":\"BOLP\"},\r\n{\"name\":\"Thar\", \"modelcode\":\"THAR\"}\r\n]"
// }
if (process.env.Environment == undefined) {
    process.env.Environment = 'local';
}
if (process.env.Environment == "local") {
    process.env.TD_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_td_sit';
    process.env.PRESALES_BASE_URL = 'https://trinitygateway-uat.azure-api.net/syouv2_0_presales_sit';
    process.env.OCP_SUBSCRIPTION_KEY = 'ca3ecee18ad749cd9e8806ad67c0d432';
    process.env.LMS_BASE_URL = 'https://stglmscrm.m2all.com/service/v4_1/rest.php';
    process.env.MAP_KEY = 'AIzaSyAAfN0RhhFfJl7zbs_USrQgYHU2KIVLM8c';
    process.env.DBSERVER = 'DESKTOP-77B7DIH\\SQLEXPRESS';
    process.env.DBDATABASENAME = 'TrinityPVA_mgmt';
    process.env.DBUSER = 'chetan';
    process.env.DBPASSWORD = 'pass,123';
    process.env.WYH_BASE_URL = 'https://wyh-dev.azurewebsites.net/api/WYHApi/';
    process.env.WYH_BASE_URL_TEMP = 'https://api.withyouhamesha.com/api/WYHApi/';
    process.env.WYH_MAP_KEY = 'AIzaSyDc5yBOn1wXBkvbthag8aylAQW8ZRWdi-M';
    process.env.WYH_WEBSITE_URL = "https://wyh-uat.azurewebsites.net";
    process.env.WYHDBSERVER = 'DESKTOP-77B7DIH\\SQLEXPRESS';
    process.env.WYHDBDATABASENAME = 'TrinityPVA_mgmt'; //WYH_Test
    process.env.WYHDBUSER = 'sa';
    process.env.WYHDBPASSWORD = 'pass,123';
    process.env.WYH_SMS_AUTH_KEY = '137875AojLjnODi5880799f';
    process.env.DBDATABASENAME_REPORT = 'ReportingPanel';
    process.env.ADD_WYH_LOG_URL = "https://chatlogs.afsmobilitycoe.com/api/WYHSessionLog/AddSessionLog";
    process.env.DF_GOOGLE_CLIENT_ACCESS_ID = "";
    process.env.ADD_WYH_LOG_URL = "https://chatlogs.afsmobilitycoe.com/api/WYHSessionLog/AddSessionLog";
    process.env.VEHICLES = "[\r\n{\"name\":\"TUV300\", \"modelcode\":\"TUVN\"},\r\n{\"name\":\"XUV300\", \"modelcode\":\"X300\"},\r\n{\"name\":\"Alturas G4\", \"modelcode\":\"ALTS\"},\r\n{\"name\":\"Marazzo\", \"modelcode\":\"MRZO\"},\r\n{\"name\":\"XUV500\", \"modelcode\":\"XUVN\"},\r\n{\"name\":\"Scorpio\", \"modelcode\":\"SCRN\"},\r\n{\"name\":\"KUV100 NXT\", \"modelcode\":\"KUVN\"},\r\n{\"name\":\"Bolero Power+\", \"modelcode\":\"BOLP\"},\r\n{\"name\":\"Thar\", \"modelcode\":\"THAR\"}\r\n]";
    process.env.WYH_MODEL_SYNONYMS = "[\r\n    {\r\n        \"value\": \"VERITO\",\r\n        \"synonyms\": [\"VERITO\"]\r\n    },\r\n    {\r\n        \"value\": \"BOLERO\",\r\n        \"synonyms\": [\"Bolero P\",\"Bolero Power\",\"Bolero Power plus\",\"Bolero Power plus SLE\",\"Bolero Power+\",\"Bolero pawar\",\"Bolero power plus\",\"Bolero zlx\",\"Bulero\",\"Mahindra Bolero\",\"Mahindra Bolero SLE\",\"Mahindra Bolero SLX\",\"Mahindra Bolero ZLX\",\"Mahindra New Bolero\",\"Mahindra's Bolero\",\"Mahindra's Bolero Power+\",\"Zlx Bolero\",\"Zlx power+\",\"bolero\",\"bolero power+\"]\r\n    },\r\n    {\r\n        \"value\": \"SCORPIO\",\r\n        \"synonyms\": [\"Mahindra scorpio\",\"Mahindra's Scorpio\",\"Scarpio\",\"Scorpio\",\"New Scorpio\"]\r\n    },\r\n    {\r\n        \"value\": \"XYLO\",\r\n        \"synonyms\": [\"XYLO\"]\r\n    },\r\n    {\r\n        \"value\": \"XUV500\",\r\n        \"synonyms\": [\"Mahindra XUV500\",\"Mahindra's XUV500\",\"XUV\",\"XUV 5 double o\",\"XUV 500\",\"XUV500N\",\"exuv500\",\"x u v 500\",\"xXUV 500\",\"xuv five double o\",\"xuv500\",\"XUV 500N\",\"XUV500 N\",\"xuv 500\"]\r\n    },\r\n    {\r\n        \"value\": \"THAR\",\r\n        \"synonyms\": [\"MAhindra's Thar Di\",\"Mahindra thar\",\"Mahindra's Thar\",\"Mahindra's Thar 700\",\"Thar\",\"Thar 700\",\"Thar Di\",\"Thar crde 700\",\"thaar\"]\r\n    },\r\n    {\r\n        \"value\": \"REVA\",\r\n        \"synonyms\": [\"REVA\"]\r\n    },\r\n    {\r\n        \"value\": \"REXTON\",\r\n        \"synonyms\": [\"REXTON\"]\r\n    },\r\n    {\r\n        \"value\": \"QUANTO\",\r\n        \"synonyms\": [\"QUANTO\"]\r\n    },\r\n    {\r\n        \"value\": \"VIBE\",\r\n        \"synonyms\": [\"VIBE\"]\r\n    },\r\n    {\r\n        \"value\": \"TUV300\",\r\n        \"synonyms\": [\"Mahindra TUV300\",\"Mahindra's TUV300\",\"TUV300\",\"TV 300\",\"et u v\",\"t u v\",\"t u v 3 double o\",\"t u v 300\",\"tuv\",\"tuv 3 double o\",\"tuv 300\",\"tuv300\"]\r\n    },\r\n    {\r\n        \"value\": \"KUV100\",\r\n        \"synonyms\": [\"K U V\",\"K U V 100\",\"K U V 100 NXT\",\"K U V 100 Next\",\"K U V Hundred\",\"K U V Hundred NXT\",\"K U V One Double O\",\"K U V One Double O NXT\",\"KUV\",\"KUV 100 NXT\",\"KUV 100 Next\",\"KUV100 NXT\",\"KUV100 Next\",\"Mahindra K U V\",\"Mahindra K U V 100\",\"Mahindra K U V 100 NXT\",\"Mahindra KUV\",\"KUV100\",\"Mahindra KUV100\",\"KIVI 100 Nxt\"]\r\n    },\r\n    {\r\n        \"value\": \"NUVOSPORT\",\r\n        \"synonyms\": [\"NUVOSPORT\",\"NUVO SPORT\"]\r\n    },\r\n    {\r\n        \"value\": \"E2O\",\r\n        \"synonyms\": [\"E2O\",\"e two o\",\"e 2 o\"]\r\n    },\r\n    {\r\n        \"value\": \"BOLERO P\",\r\n        \"synonyms\": [\"Bolero P\",\"Bolero Power\",\"Bolero Power plus\",\"Bolero Power plus SLE\",\"Bolero Power+\",\"Bolero pawar\",\"Bolero power plus\",\"Bolero zlx\",\"Bulero\",\"Mahindra Bolero\",\"Mahindra Bolero SLE\",\"Mahindra Bolero SLX\",\"Mahindra Bolero ZLX\",\"Mahindra New Bolero\",\"Mahindra's Bolero\",\"Mahindra's Bolero Power+\",\"Zlx Bolero\",\"Zlx power+\",\"bolero\",\"bolero power+\"]\r\n    },\r\n    {\r\n        \"value\": \"E2O Plus\",\r\n        \"synonyms\": [\"E2O plus\",\"e two o plus\",\"e 2 o plus\",\"E2O +\",\"e two o +\",\"e 2 o +\"]\r\n    },\r\n    {\r\n        \"value\": \"SCORPIO 1.99\",\r\n        \"synonyms\": [\"Mahindra scorpio\",\"Mahindra's Scorpio\",\"Scarpio\",\"Scorpio\",\"New Scorpio\"]\r\n    },\r\n    {\r\n        \"value\": \"NEW SCORPIO\",\r\n        \"synonyms\": [\"Mahindra scorpio\",\"Mahindra's Scorpio\",\"Scarpio\",\"Scorpio\",\"New Scorpio\"]\r\n    },\r\n    {\r\n        \"value\": \"XUV500R\",\r\n        \"synonyms\": [\"Mahindra XUV500\",\"Mahindra's XUV500\",\"XUV\",\"XUV 5 double o\",\"XUV 500\",\"XUV500N\",\"exuv500\",\"x u v 500\",\"xXUV 500\",\"xuv five double o\",\"xuv500\",\"XUV 500N\",\"XUV500 N\",\"xuv 500\"]\r\n    },\r\n    {\r\n        \"value\": \"TUV300 PLUS\",\r\n        \"synonyms\": [\"Mahindra TUV300\",\"Mahindra's TUV300\",\"TUV300\",\"TV 300\",\"et u v\",\"t u v\",\"t u v 3 double o\",\"t u v 300\",\"tuv\",\"tuv 3 double o\",\"tuv 300\",\"tuv300\"]\r\n    },\r\n    {\r\n        \"value\": \"Marazzo\",\r\n        \"synonyms\": [\"Mahindra Marazzo\",\"Mahindra's Marazzo\",\"mara ho\",\"mara zo\",\"marathi\",\"marazzo\",\"marazzzo\",\"marazzzzo\",\"marazzzzzo\",\"marazzzzzzo\"]\r\n    },\r\n    {\r\n        \"value\": \"ALTURAS G4\",\r\n        \"synonyms\": [\"Al Taurus\",\"Al Taurus g4\",\"Al tourist\",\"Al tourist g4\",\"Alto Raj\",\"Alto Raj g4\",\"MAhindra Alturas\",\"Mahindra Alturas G4\",\"Mahindra's Alturas\",\"Mahindra's Alturas G4\",\"Tura\",\"Tura g4\",\"al turas\",\"al turas g4\",\"all tourist\",\"all tourist g4\",\"altiris\",\"altiris g4\",\"altris\",\"altris g4\",\"altroz\",\"altroz g4\",\"altrus\",\"altrus g4\",\"alturas\",\"alturas g4\",\"g4\",\"taurus\",\"taurus g4\",\"ulta Rath\",\"ulta Rath g4\",\"ultra\",\"ultra g4\",\"ultras\",\"ultras g4\"]\r\n    },\r\n    {\r\n        \"value\": \"XUV300\",\r\n        \"synonyms\": [\"Mahindra XUV300\",\"Mahindra xuv 300\",\"Mahindra's XUV300\",\"XUV 300\",\"XUV300\",\"XUV3000\",\"XUV3OO\",\"Xuv30000\",\"ex u v 300\",\"x u v 3 double o\",\"x u v 300\",\"xuv 3 double o\",\"xuv 300\",\"xuv300\"]\r\n    }\r\n    \r\n]";
    process.env.mtbdserverimagepath = "https://trinity-pva-mastermanagement-uat.azurewebsites.net/images/mtbdimages/";
}
class Constant {
}
exports.default = Constant;
Constant.TD_BASE_URL = process.env.TD_BASE_URL;
Constant.PRESALES_BASE_URL = process.env.PRESALES_BASE_URL;
Constant.LMS_BASE_URL = process.env.LMS_BASE_URL;
Constant.OCP_SUBSCRIPTION_KEY = process.env.OCP_SUBSCRIPTION_KEY;
Constant.WYH_BASE_URL = process.env.WYH_BASE_URL;
Constant.WYH_BASE_URL_TEMP = process.env.WYH_BASE_URL_TEMP;
Constant.TD_METHODS = {
    GET_MODELS: '/api/Masters/Book/GetModels',
    GET_CITYCODE_BY_LATLNG: '/api/Masters/Book/GetCityCodeByLatLong',
    GET_DEALERS: '/api/ChatBotGetDealers/GetDealers',
    BOOK_TIME_SLOT: '/api/BookTimeSlot',
    BOOK_TESTDRIVE: '/api/BookSlot/Book/BookTestDrive',
    GET_DEALER_BY_CITY: '/api/Masters/Book/GetDealerByCity',
    TD_STATUS: '/api/ChatBot/GetTestDriveDetails'
};
Constant.PRESALES_METHODS = {
    GENERATE_USER_LEAD: '/api/GenerateLead/GenerateUserLead',
    CAPTURE_USER_LEAD_ATTRIBUTES: 'api/LeadAttributes/CaptureUserLeadAttributes',
    GET_M2ALL_LEAD_ID_FROM_SYOUV_LEAD_ID: 'api/GenerateLead/GetM2AllLeadIDFromSYOUVLeadID',
    GET_LOCATIONWISE_MODELS: 'api/Model/GetLocationwiseModels',
    GET_LOCATIONWISE_VARIANTS_FOR_MODEL: 'api/ViewVariant/GetModelVariantDetails',
    GET_DRIVETYPE_AND_SEATING_CAPACITY_FOR_VARIANT: 'api/VWSeater/GetSeatingAndDriveType',
    GET_COLORS_FOR_VARIANT: 'api/ColorSeater/GetVariantColors',
    GET_DEALER_FOR_VEHICLE: 'api/Dealer/GetDealer',
    GETMODELVARIENTDETAILS: '/api/ViewVariant/GetModelVariantDetails',
    GETCOLORDETAILS: '/api/PricesDetails/GetVehiclePriceDetails',
    GETOFFERDETAILS: '/api/OfferVarientBase/GetVehicleOffersAndDiscounts',
    GET_LOCATIONS: '/api/Location/GetLocations',
    CREATE_HOT_LEAD: '/api/ClickDesk/SaveLeadDetails'
};
Constant.WYH_METHODS = {
    GET_DEALER_BY_STATE_CITY: '/DealerHierarchyByStateCityModel',
    GET_DEALERS_FOR_SERVICE_BOOKING_BY_LAT_LNG: '/getDealerListforServiceBooking',
    GET_DEALERS_FOR_SERVICE_BOOKING_SEARCH: '/getDealerListforServiceBookingSearch',
    GET_APPOINTMENT_BOOKING_LATEST: '/getAppointmentBookingLatest',
    GET_BOOKING_SLOTS: '/getBookingSlot',
    GET_DEALERS_BY_SEARCH: '/getNearByDealerListSearchBOT',
    BOOK_SERVICE: '/VehicleServiceBooking',
    RAISE_SOS: '/raiseSOS',
    GET_PROFILE: '/getProfile',
    GET_RSA_DISCOUNT: '/getValidRSADiscountModelWise',
    GET_SHILED_DISCOUNT: '/getValidSheildDiscountModelWise',
    GET_VEHICLE_BY_CHASSIS_OR_REGISTRATION: '/getVehicleByChassisOrReg',
    CHECK_DEALER_HOLIDAY: '/checkDealerHoliday',
    GET_RO_BILL_LIST: '/getROBillList',
    GET_RO_BILL_LIST_SINGLE_RO: '/getROBillListForSingleRO',
    GET_SERVICE_KM_LIST: '/getServiceCalculatorKmList',
    GET_SERVICE_CALCULATOR: '/getServiceCalculator',
    GET_VEHICLE_SERVICE_REMINDER: '/getVehicleServiceReminder',
    GET_RSA_SCHEMES: '/getRSASchemeDetails',
    GET_SHIELD_SCHEMES: '/getShieldSchemeDetails',
    SEND_FEEDBACK_EMAIL: '/sendFeedBackMail',
    GET_PCLP_POINTS: '/getPCLPPoints',
    GET_PDF_INVOICE_RO_DETAILS: '/GetPdfInvoiceRoDetails',
    OPTIM_CUSTOMER: '/UpdateWhatsAppOptInStatus'
};
Constant.WYH_MSG91_API = 'https://control.msg91.com/api/sendhttp.php';
Constant.Contexts = {
    TESTDRIVE_CONTEXT: 'bookatestdrive',
    VEHICLE_AVAILABILITY_CONTEXT: 'vehicle_availability'
};
Constant.SERVICECONSTANT = {
    PROXYHOST: "mmkndweb.corp.mahindra.com",
    PROXYPORT: "80",
    PROXYSTATUS: process.env.PROXY == '1' ? false : true
};
Constant.PRICECONSTANT = {
    PRICECONTEXT: "price",
    SPECIFICATION: "price",
    WELCOME_CONTEXT: 'welcomecontext',
    SKILL_CONTEXT: 'price-followup'
};
Constant.MTBD = {
    MTBDONTEXT: "mtbd",
    WELCOME_CONTEXT: 'welcomecontext',
    SKILL_CONTEXT: 'ProductInformation-followup',
    SKILL_CONTEXT1: 'productinformation-categories-followup',
    SKILL_CONTEXT2: 'productinformation-sub-categories-followup',
    SKILL_CONTEXT3: 'SubmitInquiry-followup',
    SKILL_CONTEXT_SI: 'welcomecontext'
};
Constant.OFFERCONSTANT = {
    PRICECONTEXT: "offers",
    SPECIFICATION: "offers",
    WELCOME_CONTEXT: 'welcomecontext',
    SKILL_CONTEXT: 'offers-followup'
};
Constant.DLCONSTANT = {
    SPECIFICATION: "dealerlocator"
};
Constant.SERVICEBOOKINGCONSTANT = {
    SPECIFICATION: "servicebooking"
};
Constant.SERVICE_BOOKING_STATUS_CONSTANT = "servicebookingstatus";
Constant.TDCONSTANT = {
    SPECIFICATION: "testdrive"
};
Constant.VACONSTANT = {
    SPECIFICATION: "vehicleavailability"
};
Constant.RMCONSTANT = {
    SPECIFICATION: "rmcontactdetails"
};
Constant.SOSCONSTANT = {
    WELCOME_CONTEXT: 'welcomecontext',
    SKILL_CONTEXT: 'sos-followup',
    SPECIFICATION: "sos"
};
Constant.NSC = {
    WELCOME_CONTEXT: 'welcomecontext',
    SKILL_CONTEXT: 'nearbyservicecenters-followup',
    SPECIFICATION: "nearbyservicecenters"
};
Constant.RTVT = {
    WELCOME_CONTEXT: 'welcomecontext',
    SKILL_CONTEXT: 'wyhaction-followup',
    SPECIFICATION: "wyhaction",
    MIN_ODOMETER_LIMIT: 1,
    MAX_ODOMETER_LIMIT: 200000
};
Constant.EMICALCONSTANT = {
    PRICECONTEXT: "emicalculator",
    WELCOME_CONTEXT: 'welcomecontext',
    SKILL_CONTEXT: 'emicalculator-followup',
    ROI_MAX: 50,
    ROI_MIN: 5,
    LOANAMT_MIN: 10000,
    LOANAMT_MAX: 10000000,
    TENURE_MAX: 50,
    TENURE_MIN: 5
};
Constant.continueOptions = [
    `Specifications`,
    `Features`,
    `Price`,
    `Test Drive`,
    `Test Drive Status`,
    `Service Booking`,
    `Service Booking Status`,
    `Availability`,
    `Find Dealers`,
    `Brochure`,
    `Vehicle History`,
    `Find Service Centers`,
    `SOS`,
    `Regional Offices Contact`
];
Constant.continueOptionswyhwhatsapp = [
    `👉 Service Booking`,
    `👉 Service History`,
    `👉 Locate Service Center`,
    `👉 Roadside Assistance`,
    `👉 Buy Warranty`,
    `👉 Bill/Invoice`,
    `👉 RO`,
    `👉 Other Options`
];
Constant.continueOptionsmtbd = [
    `Submit Enquiry`,
    `Product Info`,
    `Dealer Locator`,
    `Authorized Service Center`,
    `Contact Us`,
    `Explore Product`,
    `Buy Spares`,
    `Schedule Service`
];
// static continueOptionsForGoogleHome=[
//     `Specifications`,
//     `Features`,
//     `Price`,
//     `Test Drive`,
//     `Test Drive Status`,
//     `Service Booking`,
//     `Service Booking Status`,
//     `Availability`,
//     `Find Dealers`,
//     `Vehicle History`,
//     `Find Service Centers`,
//     `SOS`,
//     `Regional Offices Contact`
// ]
Constant.continueOptionsForGoogleHome = [
    `Vehicle Information`,
    `Price`,
    `Availability`,
    `Dealer Information`,
    `Roadside Assistance`
];
Constant.ENC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBzrrEt1ByNuy8/9ALMBlZ3zJs\n' +
    'jXOlP9KtT8a9nF3nbcvF6/MWy4hBMh4V8Yk/QPzIbIY9nEA+o5h7hlQDVGf8k6Uj\n' +
    'KpDf3zEKVYNXsefSPIvmUGJRivDUx+vRODSSLdj6DSuxgoxqzN85RXnUIaz36jlQ\n' +
    'Z6REhS59IymQ4/xDzQIDAQAB\n' +
    '-----END PUBLIC KEY-----';
Constant.ENC_KEY_PRIVATE = '-----BEGIN PRIVATE KEY-----\n' +
    'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJN4vwiaT8jIRgYH\n' +
    'fAOY6+A2t8cgPg8MrV2NHZwCzThjszxwNa5fsJfNXEXgYEmUwrBE1W8d0OYuS4Aq\n' +
    'RCvK0WH/pAc9KWJt4GiuO4Df2YzC4wNJXvjcbdfPK1V9ne9l2ZEm+jRo23cvbsV/\n' +
    '/Anc79p0fOzuMNC6Eusvz+cL86TtAgMBAAECgYBeZWXyvcPgQ8H+zf+l1db2eE/+\n' +
    '2DahL34xacjQOkLem4L5ZuIVsg65vKwZ1lwL/Xr5lbYBIFa9YFjXuzZTycloM/MI\n' +
    '5fOM/V51sGyhmDDYYAt8KDKdXwVQ7ONLf8lR3vMA6quDsGxXvAO7ubYND8BavvR8\n' +
    'TGHZQgB64bkJuUcIyQJBAODR0MfBDG36L7yTKDwNHchWMEmksxvYoQ7kniYekHtf\n' +
    'cD7PL95gD5Y1tMDQzxiZ3g6Ygu+Gd8ZgHo+xAbQ26P8CQQCn7LRiRHKNv86MK8gm\n' +
    '5u1YCpI3ebLLRS+cIshDdtEwk8jGzAMEBPEicnFXLv8GTriN+ml6FN/9Mg42xH8s\n' +
    'NaYTAkABlbkRD21VASSBAdCQy87f8KuaeUzB738DKd1ri1+dXwjdiHxf5vF1L5+8\n' +
    'lDxBgiQsmiqiIaKKhXbxsF/As3plAkEAmSctraI3yEhznSwhNDnRpkad7LK1+uZy\n' +
    '8bhXZhBr4h4nNAjFh1jqhDxUWuul9J6/e94zbQC0+Tw58oFsa2nSuQJBAJ2+QJzN\n' +
    'xi0+LSjJjg8bDEwM952HFrcBb+EtPaUN9tuXcuaR6xkWKP6fbBjrMEAWLPttJ4sl\n' +
    '7//2XoLn6moDxC0=\n' +
    '-----END PRIVATE KEY-----';
// static GOOGLE_PUBLIC_KEY={
//     "f6f80f37f21c23e61f2be4231e27d269d6695329": "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIOgYbGf4AtPQwDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xOTA4MjQxNDQ5MzFaFw0xOTA5MTAwMzA0MzFaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDxD5uxObsx+sZCyeKB37SLH0RhR6xQQlYa\nkrqNGMCt2mFWQTvEeqsdsgZBwWtEo55q0cMJe0EoNZNtU4m6AJzkQLwJ4f6rnhVT\nljG6eihQIriNNBbWmIurQGk4ozR1sfGkRC0ZHADpi7nZkpp+zAbrgFijjiRfSk+C\nLiyyxRKfR3PR8itwDwxJryJ98gI8p97vnsjd6ftdPKkoWzkEI+g8CFgegKqtCc6h\nGHuJ5W8BBR6JooBKOeAZKj7kZamwzNA7Tn7Yne8h3TV/ShFRMli2sqmk1LwvFevw\nFdKnrpIHCBdkSEUs5yacz3NkQA+38Mx3chBlRo4XfDmHdlQcxdzPAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQDwwczprtk1oEViJqXJ+cUNqEaBNQK6\nXO213jvlNz00GxTB5EehQN/KYmLB4KMnle9wTA4Zg4NRJk2qcJcPThr1dXVwnM6+\nlVhOtflnLTBydUIW51CccLKUQhfWHfBOc3SPwCmQgrDIHGbBMeNeFAknlswLbTZy\nRSzXY6iyrITSB2SZPspHOCXtOkErO5CGY8643ICL6RLvS3kSdYiILfYlCheBtzWP\nyYd0JI92an0Cp9bU8b/SX/nidc5CfvG/VclNrhUSbOELsWghp1+k5OK/4gnF1yGo\nKW/vzMJc5AtLWaacDFVEQLJcxtoYOJgbiqr/75hv1xFIAAivoai5ju4O\n-----END CERTIFICATE-----\n",
//     "df8d9ee403bcc7185ad51041194bd3433742d9aa": "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIINT3rSMuADgYwDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xOTA4MTYxNDQ5MzFaFw0xOTA5MDIwMzA0MzFaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCdCA5p80ClMzAp6sW4ZcOPwdnuFRIU9RXj\n9LNiPv1IXmCI/Qh8XoqydvknLSlD8xdDpc26Hp5moJ8A9dTAe2jETb2Ol7ovoMYo\n8tOvxFNs2F0iyitzXJeI9xqKXnyB+2rV+Z6BnDQo7pC0GkpicFahnDg8mS4/xl0Z\nqcDRu2xlFFFhWZI4q5gM0d9UmVysPhyoA4vcE+NZAitmzPBNWbDQWOJT0p8a1TSs\nNidqz6Zm/Wp961mRMDdg9OpKykI1kNsYJVekmevilqLQTuXEWAM0M3YgOT3nk9/x\n4byg0J+qQdd+dYOtOVc/tJKtiYRoE9yYwo4d2PKtg+TSVYjz66tfAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBGcAZ86NoFFicz9Lr4ItqvbYHu8OVE\nMJNz03cwoX7VMgJAL8YQDWycb86+0W/pa5Hv7BgbstwS09Pepf0p3hQvNUmQu5oe\ntNACel6NmmsxRonZ8cBwoveSiPUTBS+tU/A1csmbuznKQ3goBv7+cqTP7DuX8Vhv\netHaM22ZeoXhlG6M4bWO70CfG+YJ8+xJrX4Oj66I0BIHw2drKw7MFKn+DoIxWhdm\nYnjfI/A2LsSunc8c3Hfqrsj1ibFkchRyMj+5V2EEK0pHhy17raW/ZX/LnxMSb2J7\nT6qa639LtbTyFsomymsqcFRdLBxins+I+3ngXTIje1KVOxMpUwcrxw6u\n-----END CERTIFICATE-----\n"
//   }
Constant.DF_GOOGLE_CLIENT_ACCESS_ID = process.env.DF_GOOGLE_CLIENT_ACCESS_ID;
//    static VEHICLE_LIST=JSON.parse(process.env.VEHICLES)
Constant.Infobip = {
    /*BASE_URL:"https://ejj1y3.api.infobip.com/ccaas/1/conversations/",
    SCENARIO_KEY:"7C19DF9BB1858A88E0D83EB99CEE1EC1",
    AUTH_KEY:"aGFtZXNoYV9QT0M6QXBzdWNoQDE=",
    FROM_MOBILENO: "447491163530",
    X_AGENTID: "5A3820C64BF2BE56054B29B7E5622921",
    WELCOME_CONTEXT: 'welcomecontext',
    */
    BASE_URL: process.env.WHATSAPP_BASE_URL,
    SCENARIO_KEY: process.env.WHATSAPP_SENARIO_KEY,
    AUTH_KEY: process.env.WHATSAPP_AUTH_KEY,
    FROM_MOBILENO: process.env.WHATSAPP_FROM_MOBILENO,
    X_AGENTID: process.env.WHATSAPP_X_AGENTID,
    WELCOME_CONTEXT: 'welcomecontext',
    DIALOGFLOW: process.env.WhatsappDialogFlow,
    DIALOGFLOW_USER: process.env.WhatsappDialogFlowClient,
    DIALOGFLOW_PRIVATEKEY: process.env.WHATSAPP_DF_PRIVATEKEY,
    WYHDIALOGFLOW: process.env.WYH_DIALOGFLOW,
    DIALOGFLOW_USER_WYH: process.env.WYHWhatsappDialogFlowClient,
    WYH_BASE_URL: process.env.wyhwhatsappbaseurl,
    WYH_BASE_URL_TEMP: process.env.wyhwhatsappbaseurl,
    WYH_SCENARIO_KEY: process.env.wyhwhatsappsenariokey,
    WYH_AUTH_KEY: process.env.wyhwhatsappauthkey,
    WYH_ACCOUNT: process.env.WYHWhatsappaccount,
    WYHALLOWEDNUMBERS: process.env.WYHALLOWEDNUMBERS,
    WYHTESTMOBILENUMBER: process.env.WYHTESTMOBILENUMBER
};
Constant.SKILL_CONTEXT_LIST = [
    'price-followup',
    'dealerlocator-followup',
    'emicalculator-followup',
    'offers-followup',
    'servicebooking-followup',
    'rmcontactdetails-followup',
    'vehicleavailability-followup',
    'booktestdrive-followup',
    'sos-followup',
    'vehiclehistory-followup',
    'tdstatus-followup',
    'nearbyservicecenters-followup',
    'wyhaction-followup',
    'servicebookingstatus-followup'
];
//FOr wyh_whatsapp testing (added hardcode mobNo)
Constant.mobilenoforwhatsapp = {
    referencemobno: '919975860221'
};
//# sourceMappingURL=constant.js.map