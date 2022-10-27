"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowManager = void 0;
const workflow_1 = require("./workflow");
/**
 * 流程管理器
 */
class FlowManager {
    /**
     * 获取或创建流实例
     * @param config    flow id（string）或flow配置（object）
     * @returns         workflow 实例
     */
    static getInstance(config) {
        if (typeof config === 'string') {
            return this.flowMap.get(config);
        }
        else { //新建，并加入flow map
            let ins = new workflow_1.WorkFlow(config);
            this.flowMap.set(ins.id, ins);
        }
    }
}
exports.FlowManager = FlowManager;
/**
 * 流程map，用于管理所有工作流
 * 键为流程id，值为流程对象
 */
FlowManager.flowMap = new Map();
//# sourceMappingURL=flowmanager.js.map