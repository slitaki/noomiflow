import { NTaskNode } from "./node/ntasknode";

/**
 * 任务实例
 */
export class NFTask {
    /**
     * 任务实例实体
     */
    public currentNode: NTaskNode;

    /**
     * 任务节点id
     */
    private nodeId: number

    constructor(taskNode: NTaskNode) {
        this.currentNode = taskNode;
        this.nodeId = taskNode.nfNode.nodeId;
    }
    /**
     * 设置处理人
     */
    async setAssginee() {

    }
    /**
     * 审理任务
     */
    async claim() {

    }
    getNodeId() {
        return this.nodeId;
    }
    getDefId() {
        return this.currentNode.nfNode.defId;
    }
    async finish(cfg) {
        await this.currentNode.finish(cfg);
    }
}