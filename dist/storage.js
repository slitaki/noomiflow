"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NStorage = void 0;
/**
 * 流程参数存储类
 */
class NStorage {
    /**
     * 添加参数
     * @param processId     流程id
     * @param paramName     参数名
     * @param value         参数值
     */
    static addProcessParam(processId, paramName, value) {
        if (!this.storeMap.has(processId)) {
            this.storeMap.set(processId, {});
        }
        let map = this.storeMap.get(processId);
        map[paramName] = value;
    }
    /**
     * 获取参数值
     * @param processId     流程id
     * @param paramName     参数名
     * @returns             参数值
     */
    static getProcessParam(processId, paramName) {
        if (this.storeMap.has(processId)) {
            return this.storeMap.get(processId)[paramName];
        }
    }
    /**
     * 获取流程参数obj
     * @param processId     流程id
     */
    static getProcessParamObj(processId) {
        return this.storeMap.get(processId);
    }
    /**
     * 保存工作流
     * @param flow      工作流对象
     */
    static saveFlow(flow) {
        this.flowMap.set(flow.id, flow);
    }
    /**
     * 获取工作流
     * @param flowId    流程id
     * @returns         工作流
     */
    static getFlow(flowId) {
        return this.flowMap.get(flowId);
    }
}
exports.NStorage = NStorage;
/**
 * 工作流map
 */
NStorage.flowMap = new Map();
/**
 * 存储map
 * key 流程id，value：参数对象
 */
NStorage.storeMap = new Map();
//# sourceMappingURL=storage.js.map