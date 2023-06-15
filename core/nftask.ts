import { NfNode } from "./entity/nfnode";
import { NTaskNode } from "./node/ntasknode";

/**
 * 任务实例
 */
export class NFTask {
    //  任务
    public taskNode: NTaskNode;

    /**
     * 任务节点id
     */
    private nodeId: number

    constructor(taskNode: NTaskNode) {
        this.taskNode = taskNode;
        this.nodeId = taskNode.nfNode.nodeId;
    }
    /**
     * 查询 任务节点
     * @param nodeDefName  节点名
     * @returns 
     */
    public static async getTaskNode(nodeDefName: string) {
        return await NfNode.find(nodeDefName);
    }
    /**
     * 设置处理人
     */
    async setAssgineeById(userId: number) {
        let node = this.taskNode.nfNode;
        node.assignee = userId.toString();
        node.userId = userId;
        await node.save();
        return this;
    }
    /**
     * 申请任务
     */
    async applyForTask(userId: number) {
        let node = this.taskNode.nfNode;
        node.userId = userId;
        await node.save();
        return this;
    }

    /**
     * 是否已有人处理任务
     * @returns
     */
    async isApply() {

        let assignee = this.taskNode.nfNode.assignee;
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
     * 节点定义Id 唯一
     * @returns 
     */
    getDefId() {
        return this.taskNode.nfNode.defId;
    }
    /**
     * 节点名 任务名
     * @returns 
     */
    getName(): string {
        return this.taskNode.name;
    }
    /**
     * 结束任务
     * @param cfg 
     */
    async finish(cfg?) {
        await this.taskNode.finish(cfg);
    }
    /**
     * 终止任务
     */
    async stopTask() {
        let nfnode = this.taskNode.nfNode;
        nfnode.endTime = new Date().getTime();
        //todo 数据库终止字段
        await nfnode.save();
    }
}