"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENodeType = void 0;
/**
 * 节点类型
 */
var ENodeType;
(function (ENodeType) {
    ENodeType["SEQUENCE"] = "sequence";
    ENodeType["START"] = "start";
    ENodeType["END"] = "end";
    ENodeType["EXCLUSIVE"] = "exclusive";
    ENodeType["PARALLEL"] = "parallel";
    ENodeType["INCLUSIVE"] = "inclusive";
    ENodeType["USERTASK"] = "usertask";
    ENodeType["MODULETASK"] = "moduletask"; //模块任务   
})(ENodeType = exports.ENodeType || (exports.ENodeType = {}));
//# sourceMappingURL=types.js.map