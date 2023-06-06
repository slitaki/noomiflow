import { NTaskNode } from "./node/ntasknode";

/**
 * 任务实例
 */
export class NFTask {
    //  任务
    public currentNode: NTaskNode;

    /**
     * 任务节点id
     */
    private nodeId: number

    constructor(taskNode: NTaskNode) {
        this.currentNode = taskNode;
        this.nodeId = taskNode.nfNode.nodeId;
    }

    public static async
    /**
     * 设置处理人
     */
    async setAssgineeById(userId: number) {
        let node = this.currentNode.nfNode;
        node.assignee = userId.toString();
        node.userId = userId;
        await node.save();
        return this;
    }
    /**
     * 申请任务
     */
    async applyForTask(userId: number) {
        let node = this.currentNode.nfNode;
        node.userId = userId;
        await node.save();
        return this;
    }

    /**
     * 是否已有人处理任务
     * @returns
     */
    async isApply() {

        let assignee = this.currentNode.nfNode.assignee;
        if (assignee) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 节点实体nodeId
     * @returns 
     */
    getNodeId() {
        return this.nodeId;
    }
    /**
     * 节点定义defId
     * @returns 
     */
    getDefId() {
        return this.currentNode.nfNode.defId;
    }
    getName(): string {
        return this.currentNode.name;
    }
    /**
     * 结束任务
     * @param cfg 
     */
    async finish(cfg) {
        await this.currentNode.finish(cfg);
    }
}