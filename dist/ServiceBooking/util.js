"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    constructor() {
    }
    createCategoryOptionsForQuickReplies(models) {
        return [...new Set(models.map(a => a.Name.replace("(", " ").replace(")", "").replace("-", " ")))];
    }
    cleanCategoryData(category) {
        return category;
    }
}
exports.default = Utils;
//# sourceMappingURL=util.js.map