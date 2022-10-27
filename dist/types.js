"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAssignType = exports.ETaskType = exports.EEventType = exports.EGateType = exports.ENodeType = void 0;
/**
 * 工作流节点枚举类型
 */
var ENodeType;
(function (ENodeType) {
    /**
     * 事件
     */
    ENodeType["EVENT"] = "event";
    /**
     * 子流程
     */
    ENodeType["PROCESS"] = "process";
    /**
     * 顺序流
     */
    ENodeType["SEQUENCE"] = "sequence";
    /**
     * 网关
     */
    ENodeType["GATE"] = "gate";
})(ENodeType = exports.ENodeType || (exports.ENodeType = {}));
/**
 * 网关节点类型
 */
var EGateType;
(function (EGateType) {
    /**
     * 唯一网关
     */
    EGateType["EXCLUSIVE"] = "exclusive";
    /**
     * 并行网关
     */
    EGateType["PARALLEL"] = "parallel";
    /**
     * 包含网关
     */
    EGateType["INCLUSIVE"] = "inclusive";
})(EGateType = exports.EGateType || (exports.EGateType = {}));
/**
 * 事件类型
 */
var EEventType;
(function (EEventType) {
    /**
     * 开始事件
     */
    EEventType["START"] = "start";
    /**
     * 结束事件
     */
    EEventType["END"] = "end";
    /**
     * 终止事件
     */
    EEventType["TERMINATE"] = "terminate";
})(EEventType = exports.EEventType || (exports.EEventType = {}));
/**
 * 任务类型
 */
var ETaskType;
(function (ETaskType) {
    /**
     * 用户任务
     */
    ETaskType["USER"] = "user";
    /**
     * 手工任务
     */
    ETaskType["MANUAL"] = "manual";
})(ETaskType = exports.ETaskType || (exports.ETaskType = {}));
/**
 * 任务指派类型
 */
var EAssignType;
(function (EAssignType) {
    /**
     * 指派到组
     */
    EAssignType["GROUP"] = "group";
    /**
     * 指派到人
     */
    EAssignType["USER"] = "user";
})(EAssignType = exports.EAssignType || (exports.EAssignType = {}));
//# sourceMappingURL=types.js.map