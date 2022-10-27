"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowCondition = void 0;
const storage_1 = require("./storage");
/**
 * 条件类
 */
class FlowCondition {
    /**
     * 执行表达式
     * @returns
     */
    exec() {
        let param = storage_1.NStorage.getProcessParamObj(this.processId);
        return this.expression.val(param);
    }
}
exports.FlowCondition = FlowCondition;
//# sourceMappingURL=flowcondition.js.map