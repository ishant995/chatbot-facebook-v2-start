import _ = require("lodash");

export default class Utils{
    constructor(){

    }

    createCategoryOptionsForQuickReplies(models:any[]){
        return [...new Set(models.map(a=>a.Name.replace("("," ").replace(")","").replace("-"," ")))]
    }

    cleanCategoryData(category){
        return category
    }

}