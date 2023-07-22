import { NfNode } from "./entity/nfnode";
import { NTaskNode } from "./node/ntasknode";

/**
 * 任务实例
 */
export class NFTask {
    //任务
    public taskNode: NTaskNode;
    //任务Entity //todo
    public nfNode: NfNode;
    //流程变量
    public params: any = {};

    constructor(taskNode: NTaskNode) {
        this.taskNode = taskNode;
        this.nfNode = taskNode.nfNode;
        // this.defId = taskNode.nfNode.defId;
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

    async getAssigneeId() {
        return this.taskNode.nfNode.assignee;
    }
    /**
    * 设置流程变量
    * @param key       key
    * @param value     值
    */
    async setVariables(key: string, value: any) {
        if (key) {
            this.params[key] = value;
        } else {
            this.params = value;
        }
        //更改参数保存到流程实例中
        this.nfNode.variables = JSON.stringify(this.params);
        await this.nfNode.save();
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
    getParams(key?: string) {
        if (!this.params) {
            return; //判断 todo
        }
        if (key) {
            return this.params[key];
        }
        return this.params;
    }
}