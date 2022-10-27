"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkFlow = void 0;
const nodemanager_1 = require("./nodemanager");
/**
 * 工作流
 */
class WorkFlow {
    /**
     * 构造器
     * @param config    流程配置对象（由流程配置文件生成）
     */
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        //遍历节点
        if (config.children) {
            for (let c of config.children) {
                //创建节点
                let node = nodemanager_1.NodeManager.getInstance(c.node, c);
                this.nodeMap.set(node.id, node);
            }
        }
    }
    /**
     * 运行流程
     * @param formFirst     从开始运行
     */
    run(fromStart) {
        if (fromStart) {
            this.currentNodeId = this.nodeMap.get(this.nodeMap.keys()[0]).id;
        }
        const node = this.nodeMap.get(this.currentNodeId);
        node.run();
    }
}
exports.WorkFlow = WorkFlow;
//# sourceMappingURL=workflow.js.map