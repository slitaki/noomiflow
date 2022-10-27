"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeManager = void 0;
/**
 * 流程节点管理器
 * 用于管理流程节点类
 */
class NodeManager {
    /**
     * 注册节点类
     * @param clazz 节点类
     * @param name  注册类名，默认为类名
     */
    static registClass(clazz, name) {
        this.nodeClassMap.set(name || clazz.name, clazz);
    }
    /**
     * 获取节点类
     * @param name  节点类名
     * @returns     节点类
     */
    static getClass(name) {
        return this.nodeClassMap.get(name);
    }
    /**
     * 获取节点实例
     * @param name      类名
     * @param config    实例初始化配置
     * @returns         创建后的实例
     */
    static getInstance(name, config) {
        let clazz = this.getClass(name);
        if (!clazz) {
            return;
        }
        return Reflect.construct(clazz, [config]);
    }
}
exports.NodeManager = NodeManager;
/**
 * 节点类管理器
 */
NodeManager.nodeClassMap = new Map();
//# sourceMappingURL=nodemanager.js.map