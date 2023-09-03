import { NfNode } from "./entity/nfnode";
import { NfProcess } from "./entity/nfprocess";
import { NFProcess } from "./nfprocess";
import { NTaskNode } from "./node/ntasknode";

/**
 * 任务实例
 */
export class NFTask {
    //任务
    public taskNode: NTaskNode;
    //任务Entity //todo
    public nfNode: NfNode;
    //流程
    private process: NFProcess
    constructor(taskNode: NTaskNode, process: NFProcess) {
        this.taskNode = taskNode;
        this.nfNode = taskNode.nfNode;
        this.process = process
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
     * 获取任务处理人
     * @returns 
     */
    async getAssigneeId() {
        return this.taskNode.nfNode.assignee;
    }
    /**
    * 设置流程变量
    * @param key       key
    * @param value     值
    */
    async setVariables(key: string, value: any) {
        await this.process.setParam(key, value);
    }
    /**
     * 节点实体nodeId
     * @returns 
     */
    getNodeId() {
        return this.nfNode.nodeId;
    }
    /**
     * 节点定义Id 唯一
     * @returns 
     */
    getDefId() {
        return this.nfNode.defId;
    }
    /**
     * 节点名 任务名
     * @returns 
     */
    getName(): string {
        return this.taskNode.name;
    }
    /**
     * 获取开始时间
     * @returns 
     */
    getStartTime(): number {
        return this.nfNode.startTime;
    }
    /**
     * 获取当前任务流程Id
     * @returns 
     */
    getProcessInstId(): number {
        return this.process.getId();
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
        //todo 终止的任务删除
        await nfnode.save();
    }
}