"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTBDDB = exports.RTVTDB = exports.NSCDB = exports.SOSDB = exports.TDStatusDBHelper = exports.ServiceBookingDBHelper = exports.FaqDetailsDBHelper = exports.RMContactDetailsDBHelper = exports.EMICalculatorDB = exports.DealerLocatorDBHelper = exports.VehicleAvailabilityDBHelper = exports.TestdriveDBHelper = exports.PriceDB = void 0;
const sql = require("mssql");
/**
 * SYOUV WEBHOOK DATABASE CONNECTION
 */
let syouv_config = {};
if (process.env.Environment == undefined) {
    syouv_config = {
        server: 'DESKTOP-77B7DIH\\SQLEXPRESS',
        user: 'sa',
        password: 'pass,123',
        database: 'TrinityPVA_mgmt',
        options: {
            encrypt: true
        },
        port: 61414
    };
}
else {
    syouv_config = {
        server: process.env.DBSERVER,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBDATABASENAME,
        options: {
            encrypt: true
        }
    };
}
/**
 * Create SYOUV MASTER MANAGEMENT connection pool
*/
var syouv_connectionPool = new sql.ConnectionPool(syouv_config);
/**
 * Create SYOUV MASTER MANAGEMENT pool promise
*/
var syouv_poolPromise = syouv_connectionPool.connect();
/**
 * Handle AZURE DB SCALING and DB connection lost error
*/
syouv_poolPromise.catch(err => {
    console.log('DB Error Syouv', err);
    if (err.code == 'ETIMEOUT') {
        syouv_connectionPool.close();
        syouv_connectionPool = new sql.ConnectionPool(syouv_config);
        syouv_poolPromise = syouv_connectionPool.connect();
    }
});
/**
 * REPORTING PANEL DATABASE CONNECTION
 */
let reports_config = {};
if (process.env.Environment == undefined) {
    reports_config = {
        server: 'DESKTOP-77B7DIH\\SQLEXPRESS',
        user: 'sa',
        password: 'pass,123',
        database: 'ReportingPanel',
        options: {
            encrypt: false
        },
        port: 61414
    };
}
else {
    reports_config = {
        server: process.env.DBSERVER,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBDATABASENAME_REPORT,
        options: {
            encrypt: true
        }
    };
}
/**
 * Create REPORTING DB connection pool
*/
var reports_connectionPool = new sql.ConnectionPool(reports_config);
/**
 * Create REPORTING DB pool promise
*/
var reports_poolPromise = reports_connectionPool.connect();
/**
 * Handle AZURE DB SCALING and DB connection lost error
*/
reports_poolPromise.catch(err => {
    console.log('DB Error reporting', err);
    if (err.code == 'ETIMEOUT') {
        reports_connectionPool.close();
        reports_connectionPool = new sql.ConnectionPool(reports_config);
        reports_poolPromise = reports_connectionPool.connect();
    }
});
/**
 * WYH DATABASE CONNECTION
 */
let WYH_config = {};
if (process.env.Environment == undefined) {
    WYH_config = {
        server: 'DESKTOP-77B7DIH\\SQLEXPRESS',
        user: 'sa',
        password: 'pass,123',
        database: 'ReportingPanel',
        options: {
            encrypt: false
        },
        port: 61414
    };
}
else {
    WYH_config = {
        server: process.env.WYHDBSERVER,
        user: process.env.WYHDBUSER,
        password: process.env.WYHDBPASSWORD,
        database: process.env.WYHDBDATABASENAME,
        options: {
            encrypt: true
        }
    };
}
/**
 * Create WYH DB connection pool
*/
var wyh_connectionPool = new sql.ConnectionPool(WYH_config);
console.log(WYH_config);
/**
 * Create WYH DB pool promise
*/
var wyh_poolPromise = wyh_connectionPool.connect();
/**
 * Handle AZURE DB SCALING and DB connection lost error
*/
wyh_poolPromise.catch(err => {
    console.log(WYH_config);
    if (err.code == 'ETIMEOUT') {
        wyh_connectionPool.close();
        wyh_connectionPool = new sql.ConnectionPool(WYH_config);
        wyh_poolPromise = wyh_connectionPool.connect();
    }
});
/**
 * Shared DB helper class across multiple skills
*/
class SharedDB {
    constructor() {
        /**
         * Add skill session log for each response in REPORTING DB
         *
         * @param {string} UserSessionID
         * @param {string} ConsultantCode
         * @param {string} CustomerName
         * @param {string} AnswerStatus
         * @param {string} VehicleModelCode
         * @param {string} AppName
         * @param {Number} Confidence
         * @param {string} UserQuery
         * @param {string} BotAnswer
         * @param {string} EmailID
         * @param {string} FeatureActionName
         * @param {string} IsFallBack
         * @param {string} source
         * @returns
         */
        this.AddSessionLogInReports = (UserSessionID, ConsultantCode, CustomerName, AnswerStatus, VehicleModelCode, AppName, Confidence, UserQuery, BotAnswer, EmailID, FeatureActionName, IsFallBack, source) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('UserSessionID', sql.VarChar(255), UserSessionID)
                        .input('ConsultantCode', sql.VarChar(255), ConsultantCode)
                        .input('CustomerName', sql.VarChar(255), CustomerName)
                        .input('VehicleModelCode', sql.VarChar(255), VehicleModelCode)
                        .input('UserQuery', sql.VarChar(255), UserQuery)
                        .input('BotAnswer', sql.VarChar(100000), BotAnswer)
                        .input('EmailID', sql.VarChar(255), EmailID)
                        .input('FeatureActionName', sql.VarChar(255), FeatureActionName)
                        .input('IsFallBack', sql.VarChar(255), IsFallBack)
                        .input('AppName', sql.VarChar(255), AppName)
                        .input('Confidence', sql.VarChar(255), Confidence)
                        .input('AnswerStatus', sql.VarChar(255), AnswerStatus)
                        .input('source', sql.VarChar(255), source)
                        .execute("AddSessionLog")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
        /**
             * Add leads
             *
             * @param {string} Name
             * @param {string} Mobileno
             * @param {string} emailID
             * @param {string} AnswerStatus
             * @param {string} Action
             * @returns
             */
        this.SaveBOTLeads = (Name, Mobileno, emailID, Action, Platform) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('Name', sql.VarChar(255), Name)
                        .input('Mobileno', sql.VarChar(255), Mobileno)
                        .input('emailID', sql.VarChar(255), emailID)
                        .input('Action', sql.VarChar(255), Action)
                        .input('Platform', sql.VarChar(255), Platform)
                        .execute("SaveBOTLeads")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
        /**
         * Add skill tracking logs
         *
         * @param {string} UserSessionID
         * @param {string} skillname
         * @param {string} step
         * @param {string} response
         * @param {string} google_response
         * @param {number} stepno
         * @returns
         */
        this.AddSkillTrack = (UserSessionID, skillname, step, response, google_response, stepno) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('UserSessionID', sql.VarChar(255), UserSessionID)
                        .input('skillname', sql.VarChar(255), skillname)
                        .input('step', sql.VarChar(255), step)
                        .input('response', sql.NVarChar, response)
                        .input('google_response', sql.NVarChar, google_response)
                        .input('stepno', sql.VarChar(255), stepno)
                        .execute("AddSkillTrack")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
        /**
         * Add API call response in DB for
         * - Service Booking
         * - SOS
         * - Test drive
         * @param {string} CustomerName
         * @param {string} skillname
         * @param {string} SessionID
         * @param {string} MobileNo
         * @param {string} EmailID
         * @param {string} Response
         * @param {string} Otherdetails
         * @returns
         */
        this.AddAPITrack = (CustomerName, skillname, SessionID, MobileNo, EmailID, Response, Otherdetails) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('CustomerName', sql.VarChar(50), CustomerName)
                        .input('skillname', sql.VarChar(50), skillname)
                        .input('SessionID', sql.VarChar(255), SessionID)
                        .input('MobileNo', sql.VarChar(20), MobileNo)
                        .input('EmailID', sql.VarChar(100), EmailID)
                        .input('Response', sql.VarChar(100000), Response)
                        .input('Otherdetails', sql.VarChar(100000), Otherdetails)
                        .execute("Add_API_Failure_Tracking")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
        /** NOT IN USE
         * Save Google Users data in DB
         *
         * @param {string} Name
         * @param {string} Mobileno
         * @param {string} emailID
         * @param {boolean} IsGAUser
         * @returns
         */
        this.SaveCustomerDetails = (Name, Mobileno, emailID, IsGAUser) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('Name', sql.VarChar(100), Name)
                        .input('Mobileno', sql.VarChar(20), Mobileno)
                        .input('emailID', sql.VarChar(100), emailID)
                        .input('IsGAUser', sql.VarChar, IsGAUser ? 1 : 0)
                        .execute("SaveCustomerDetails")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
        /** NOT IN USE
         * Update Google Users data in DB
         *
         * @param {string} Mobileno
         * @param {string} emailID
         * @returns
         */
        this.UpdateCustomerDetails = (Mobileno, emailID) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('Mobileno', sql.VarChar(20), Mobileno)
                        .input('emailID', sql.VarChar(100), emailID)
                        .execute("UpdateCustomerDetails")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
        /** IN USE
         * Get Session data for Users in DB from session id
         *
         * @param {string} Mobileno
         * @param {string} emailID
         * @returns
         */
        this.Get_UserSessionDataOnSessionID = (SessionID) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('SessionID', sql.VarChar(20), SessionID)
                        .execute("Get_UserSessionDataOnSessionID")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
        /**  IN USE
         * GET REPORTING PANEL USERS
         *
         * @param {string} Mobileno
         * @param {string} emailID
         * @returns
         */
        this.GetReportingUsers = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .execute("Get_UserList")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
        /**  IN USE
         * GET REPORTING PANEL USERS LIVE FROM LAST 24 HRS
         *
         * @param {string} Mobileno
         * @param {string} emailID
         * @returns
         */
        this.GetLiveUsers = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .execute("Get_UserList")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
        /**
         * Get response message text by action name
         *
         * @param {*} actionname
         * @returns
         */
        this.getNonTechnicalDetails = (actionname) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                syouv_poolPromise.then(pool => {
                    pool.request()
                        .input('ActioName', sql.VarChar(255), actionname)
                        .execute("GetNonTechnicleDetails")
                        .then(result => {
                        resolve(result.recordset[0]);
                    }).catch(error => {
                        reject();
                    });
                }).catch(error => {
                    reject();
                });
            });
        });
        /**
         * Get response message if vehicle is inactive or not
         *
         * @param {*} actionname
         * @returns
         */
        this.chkVehicleActiveorNot = (vehiclename) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                syouv_poolPromise.then(pool => {
                    pool.query("select * from VehicleMaster where IsActive=0 and VehicleName='" + vehiclename + "'")
                        .then(result => {
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }
    /** NOT IN USE
     * Returns list of active vehicles
     *
     * @returns
     * @memberof SharedDB
     */
    getallVehicleDetails() {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.query("select * from VehicleMaster where IsActive=1")
                    .then(result => {
                    resolve(result.recordset);
                }).catch(error => {
                    reject(null);
                });
            }).catch(error => {
                reject(null);
            });
        });
    }
    /**
     * Add TD lead entry in DB
     * - This data is dumped after model selection in TD booking flow
     * - Fetched using GetTestdriveLMSData() method from TD DB helper
     *
     * @param {*} dialogKey
     * @param {*} sessionId
     * @param {*} name
     * @param {*} email
     * @param {*} mobile
     * @param {*} isCTD
     * @param {*} apiResponse
     * @returns
     * @memberof SharedDB
     */
    AddTestdriveLMSData(dialogKey, sessionId, name, email, mobile, isCTD, apiResponse) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('dialogkey', sql.VarChar, dialogKey)
                    .input('sessionid', sql.VarChar, sessionId)
                    .input('customername', sql.VarChar, name)
                    .input('customeremailid', sql.VarChar, email)
                    .input('customermobile', sql.VarChar, mobile)
                    .input('isCTD', sql.VarChar, isCTD ? 1 : 0)
                    .input('response', sql.VarChar, apiResponse)
                    .execute("AddBotLeadGenerationEntries")
                    .then(result => {
                    resolve(result);
                }).catch(error => {
                    reject();
                });
            }).catch(error => {
                reject();
            });
        });
    }
}
exports.default = SharedDB;
/**
 * Price DB helper class
*/
class PriceDB {
    constructor() {
        /**
         * Get model specific price answer if price APIs fails/ skill fails. Basically an error handler
         *
         * @param {*} FetureName
         * @param {*} VariantName
         * @param {*} vehicle
         * @returns
         */
        this.ModelSpecificSpeechURL = (FetureName, VariantName, vehicle) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                syouv_poolPromise.then(pool => {
                    pool.request()
                        .input('FetureName', sql.VarChar(255), FetureName)
                        .input('VariantName', sql.VarChar(255), VariantName)
                        .input('vehicle', sql.VarChar(255), vehicle)
                        .execute("ModelSpecificSpeechURL")
                        .then(result => {
                        resolve(result.recordset[0]);
                    }).catch(error => {
                        reject();
                    });
                }).catch(error => {
                    reject();
                });
            });
        });
    }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof PriceDB
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        console.log(result.recordset);
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Get color-code for vehicle variant
     *
     * @param {*} vehicle
     * @param {*} variant
     * @param {*} color
     * @param {string} [fueltype=""]
     * @returns
     * @memberof PriceDB
     */
    GetColorForVariant(vehicle, variant, color, fueltype = "") {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('vehicle', sql.NVarChar, vehicle)
                    .input('varient', sql.NVarChar, variant)
                    .input('color', sql.NVarChar, color)
                    .input('fueltype', sql.NVarChar, fueltype)
                    .execute('GetColorVarients')
                    .then(result => {
                    console.log(result);
                    //pool.close();
                    resolve(result.recordset);
                }).catch(error => {
                    //pool.close();
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.PriceDB = PriceDB;
/**
 * Test drive DB helper class
*/
class TestdriveDBHelper {
    constructor() {
    }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof TestdriveDBHelper
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Fetch dumped lead data
     * - Data was dumped using AddTestdriveLMSData() method from shared db helper
     *
     * @param {*} dialogKey
     * @returns
     * @memberof TestdriveDBHelper
     */
    GetTestdriveLMSData(dialogKey) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('dialogkey', sql.VarChar, dialogKey)
                    .execute("GetBotLeadGenerationEntries")
                    .then(result => {
                    if (result.recordset[0]) {
                        try {
                            resolve(JSON.parse(result.recordset[0].response));
                        }
                        catch (e) {
                            reject();
                        }
                    }
                    else {
                        reject();
                    }
                }).catch(error => {
                    reject();
                });
            }).catch(error => {
                reject();
            });
        });
    }
}
exports.TestdriveDBHelper = TestdriveDBHelper;
/**
 * Vehicle Availability DB helper class
*/
class VehicleAvailabilityDBHelper {
    constructor() {
    }
    /**
     * Get color-code for vehicle variant
     *
     * @param {*} vehicle
     * @param {*} variant
     * @param {*} color
     * @param {string} [fueltype=""]
     * @returns
     * @memberof VehicleAvailabilityDBHelper
     */
    GetColorForVariant(vehicle, variant, color, fueltype = "") {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('vehicle', sql.NVarChar, vehicle)
                    .input('varient', sql.NVarChar, variant)
                    .input('color', sql.NVarChar, color)
                    .input('fueltype', sql.NVarChar, fueltype)
                    .execute('GetColorVarients')
                    .then(result => {
                    //pool.close();
                    resolve(result.recordset);
                }).catch(error => {
                    //pool.close();
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof VehicleAvailabilityDBHelper
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.VehicleAvailabilityDBHelper = VehicleAvailabilityDBHelper;
/**
 * Dealer Locator DB helper class
*/
class DealerLocatorDBHelper {
    constructor() { }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof DealerLocatorDBHelper
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.DealerLocatorDBHelper = DealerLocatorDBHelper;
/**
 * EMI calculator DB helper class
*/
class EMICalculatorDB {
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof EMICalculatorDB
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.EMICalculatorDB = EMICalculatorDB;
/**
 * RM Contact DB helper class
*/
class RMContactDetailsDBHelper {
    constructor() { }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof RMContactDetailsDBHelper
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Get Regional Office details by State
     *
     * @param {*} state
     * @returns
     * @memberof RMContactDetailsDBHelper
     */
    GetRoDetailsByState(state) {
        return new Promise((resolve, reject) => {
            wyh_poolPromise.then(pool => {
                pool.request()
                    .input('state', sql.NVarChar, state)
                    .execute('BOT_sp_GetRODetailsByState')
                    .then(result => {
                    //pool.close();
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject('BOT_sp_GetRODetailsByState recordset length is 0');
                    }
                }).catch(error => {
                    //pool.close();
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.RMContactDetailsDBHelper = RMContactDetailsDBHelper;
/**
 * RM Contact DB helper class
*/
class FaqDetailsDBHelper {
    constructor() { }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof FaqDetailsDBHelper
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Get WYH FAQ Response
     *
     * @param {*} attribute
     * @param {*} keyword
     * @returns
     * @memberof FaqDetailsDBHelper
     */
    GetFAQDetailsByAttributeAndKeyword(attribute, keyword) {
        return new Promise((resolve, reject) => {
            wyh_poolPromise.then(pool => {
                pool.request()
                    .input('Attribute', sql.NVarChar, attribute)
                    .input('Keyword', sql.NVarChar, keyword)
                    .execute('BOT_sp_GetFAQByAttributeAndKeyword')
                    .then(result => {
                    //pool.close();
                    resolve(result.recordset);
                }).catch(error => {
                    //pool.close();
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.FaqDetailsDBHelper = FaqDetailsDBHelper;
/**
 * Service Booking DB helper class
*/
class ServiceBookingDBHelper {
    constructor() {
        /**
         * Get workshops for model and city
         *
         * @param {*} city
         * @param {*} modelGroup
         * @returns
         */
        this.GetDealersForCityByModel = (city, modelGroup) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                START_LOG('BOT_sp_GET_DEALERS_BY_CITY');
                wyh_poolPromise.then(pool => {
                    pool.request()
                        .input('City', sql.NVarChar, city)
                        .input('ModelGroup', sql.NVarChar, modelGroup)
                        .execute('BOT_sp_GET_DEALERS_BY_CITY')
                        .then(result => {
                        END_LOG('BOT_sp_GET_DEALERS_BY_CITY');
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                });
            });
        });
        /**
         * Get workshops in 100 Km radius for model by latlng
         *
         * @param {*} modelGroup
         * @param {*} lat
         * @param {*} lng
         * @returns
         */
        this.GetNearbyDealersByLatlng = (modelGroup, lat, lng) => __awaiter(this, void 0, void 0, function* () {
            console.log(modelGroup);
            console.log(lat);
            console.log(lng);
            return new Promise((resolve, reject) => {
                START_LOG('BOT_sp_GetNearestWorkshopsForServiceBooking');
                wyh_poolPromise.then(pool => {
                    pool.request()
                        .input('VehicleName', sql.NVarChar, modelGroup)
                        .input('Latitude', sql.NVarChar, lat)
                        .input('Longitude', sql.NVarChar, lng)
                        .execute('BOT_sp_GetNearestWorkshopsForServiceBooking')
                        .then(result => {
                        console.log(result);
                        END_LOG('BOT_sp_GetNearestWorkshopsForServiceBooking');
                        resolve(result.recordset);
                    }).catch(error => {
                        reject(error);
                    });
                });
            });
        });
    }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof ServiceBookingDBHelper
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Get dealer details by parent code and location code
     *
     * @param {*} parantGroup
     * @param {*} locationCode
     * @returns
     * @memberof ServiceBookingDBHelper
     */
    GetDealerDetailsByCodes(parantGroup, locationCode) {
        return new Promise((resolve, reject) => {
            START_LOG('BOT_sp_GET_DEALER_DETAILS_BY_CODES');
            wyh_poolPromise.then(pool => {
                pool.request()
                    .input('ParentGroup', sql.NVarChar, parantGroup)
                    .input('LocationCode', sql.NVarChar, locationCode)
                    .execute('BOT_sp_GET_DEALER_DETAILS_BY_CODES')
                    .then(result => {
                    //pool.close();
                    END_LOG('BOT_sp_GET_DEALER_DETAILS_BY_CODES');
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject('BOT_sp_GET_DEALER_DETAILS_BY_CODES recordset length is 0');
                    }
                }).catch(error => {
                    //pool.close();
                    reject(error);
                });
            });
        });
    }
    /**
     * Get City name by partial city name
     * - Used for city input helper
     *
     * @param {*} partialCityName
     * @returns
     * @memberof ServiceBookingDBHelper
     */
    GetCityNameByQueryParams(partialCityName) {
        return new Promise((resolve, reject) => {
            START_LOG('BOT_sp_GET_CITY_BY_PARAM');
            wyh_poolPromise.then(pool => {
                pool.request()
                    .input('City', sql.NVarChar, partialCityName)
                    .execute('BOT_sp_GET_CITY_BY_PARAM')
                    .then(result => {
                    END_LOG('BOT_sp_GET_CITY_BY_PARAM');
                    resolve(result.recordset);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }
    /**
     * Update service booking count for WYH bot reports
     *
     * @param {*} sessionId
     * @param {*} intentName
     * @param {*} botResponse
     * @param {*} regNo
     * @returns
     * @memberof ServiceBookingDBHelper
     */
    UpdateServiceBookingCount(sessionId, intentName, botResponse, regNo) {
        return new Promise((resolve, reject) => {
            reports_poolPromise.then(pool => {
                pool.request()
                    .input('UserSessionID', sql.NVarChar, sessionId)
                    .input('BotAnswer', sql.NVarChar, botResponse)
                    .input('FeatureActionName', sql.NVarChar, intentName)
                    .input('RegistrationNo', sql.NVarChar, regNo)
                    .execute('usp_service_booking_input_wyh')
                    .then(result => {
                    resolve(result.recordset);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }
    /**
     * Get WYH mobile number from GA email address
     *
     * @param {*} EmailID
     * @returns
     * @memberof ServiceBookingDBHelper
     */
    GetMobileFromEmail(EmailID) {
        return new Promise((resolve, reject) => {
            wyh_poolPromise.then(pool => {
                pool.request()
                    .input('EmailId', sql.NVarChar, EmailID)
                    .execute('sp_GetMobileNo')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        resolve(null);
                    }
                }).catch(error => {
                    resolve(null);
                });
            });
        });
    }
}
exports.ServiceBookingDBHelper = ServiceBookingDBHelper;
/**
 * TD Status DB helper class
*/
class TDStatusDBHelper {
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof TDStatusDBHelper
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.TDStatusDBHelper = TDStatusDBHelper;
/**
 * SOS DB helper class
*/
class SOSDB {
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof SOSDB
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.SOSDB = SOSDB;
/**
 * Nearby Service Centers DB helper class
*/
class NSCDB {
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof NSCDB
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.NSCDB = NSCDB;
/**
 * WYH real time vehicle details DB helper class
*/
class RTVTDB {
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof RTVTDB
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.RTVTDB = RTVTDB;
class MTBDDB {
    constructor() {
        this.AddMTBDLog = (name, MobileNo, City, TransportCompany, FleetStrength, Category, SubCategory, Model, Purpose, PurchasePeriod, profile) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                reports_poolPromise.then(pool => {
                    pool.request()
                        .input('name', sql.VarChar(255), name)
                        .input('MobileNo', sql.VarChar(255), MobileNo)
                        .input('City', sql.VarChar(255), City)
                        .input('TransportCompany', sql.VarChar(255), TransportCompany)
                        .input('FleetStrength', sql.VarChar(255), FleetStrength)
                        .input('Category', sql.VarChar(255), Category)
                        .input('SubCategory', sql.VarChar(255), SubCategory)
                        .input('Model', sql.VarChar(255), Model)
                        .input('Purpose', sql.VarChar(255), Purpose)
                        .input('PurchasePeriod', sql.VarChar(255), PurchasePeriod)
                        .input('profile', sql.VarChar(255), profile)
                        .execute("AddMTBDLeads")
                        .then(result => {
                        if (result.recordset.length > 0) {
                            resolve(result.recordset[0].leadID);
                        }
                        else {
                            reject("No value found in db");
                        }
                        //resolve(result.recordset)
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof MTBDDB
     */
    GetMessageForAction(actionName) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('ActioName', sql.NVarChar, actionName)
                    .execute('GetNonTechnicleDetails')
                    .then(result => {
                    if (result.recordset.length > 0) {
                        resolve(result.recordset[0]);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    /**
     * Get response message text by action name
     *
     * @param {*} actionName
     * @returns
     * @memberof MTBDDB
     */
    getMTBDVehicleList(level, parent, name) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('level', sql.NVarChar, level)
                    .input('parentcode', sql.NVarChar, parent)
                    .input('name', sql.NVarChar, name)
                    .execute('Get_MTBDProductInfo')
                    .then(result => {
                    console.log("DB ERROR");
                    console.log(result);
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    getMTBDVehicleModelDetails(level, parent, name, model) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('level', sql.NVarChar, level)
                    .input('parentcode', sql.NVarChar, parent)
                    .input('name', sql.NVarChar, name)
                    .input('model', sql.NVarChar, model)
                    .execute('Get_MTBDProductInfoDetails')
                    .then(result => {
                    console.log(result);
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
    getMTBDVehicleUsageDetails(level, parent, name, model) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('level', sql.NVarChar, level)
                    .input('parentcode', sql.NVarChar, parent)
                    .input('name', sql.NVarChar, name)
                    .input('model', sql.NVarChar, model)
                    .execute('Get_MTBDUsageList')
                    .then(result => {
                    console.log(result);
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
    getMTBDVehicleUsageSubCategory(use_for) {
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('use_for', sql.NVarChar, use_for)
                    .execute('Get_MTBDUsageSubcategoryList')
                    .then(result => {
                    console.log(result);
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
    CheckIfAnyExists(category, subcategory, productmodel) {
        console.log(category + "_" + subcategory + "_" + productmodel);
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('category', sql.NVarChar, category)
                    .input('subcategory', sql.NVarChar, subcategory)
                    .input('productmodel', sql.NVarChar, productmodel)
                    .execute('GetCategoryFromModel')
                    .then(result => {
                    console.log(result);
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
    CheckIfAnyExistsSubcategory(category, subcategory, productmodel) {
        console.log(category + "_" + subcategory + "_" + productmodel);
        return new Promise((resolve, reject) => {
            syouv_poolPromise.then(pool => {
                pool.request()
                    .input('category', sql.NVarChar, category)
                    .input('subcategory', sql.NVarChar, subcategory)
                    .input('productmodel', sql.NVarChar, productmodel)
                    .execute('GetCategoryFromSubCategory')
                    .then(result => {
                    console.log(result);
                    if (result.recordset.length > 0) {
                        resolve(result.recordset);
                    }
                    else {
                        reject("No value found in db");
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }
}
exports.MTBDDB = MTBDDB;
function START_LOG(LABEL) {
    if (process.env.Environment == 'development' || process.env.Environment == 'uat') {
        console.time(LABEL);
    }
}
function END_LOG(LABEL) {
    if (process.env.Environment == 'development' || process.env.Environment == 'uat') {
        console.timeEnd(LABEL);
    }
}
//# sourceMappingURL=DB.js.map