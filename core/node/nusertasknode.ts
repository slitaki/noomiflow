import { EntityManager, getEntityManager, Query } from "relaen";
import { NfNode } from "../entity/nfnode";
import { NFUserManager } from "../nfusermanager";
import { NTaskNode } from "./ntasknode";
/**
 * 人工任务
 */
export class NUserTaskNode extends NTaskNode {

    async run() {
        //保留实际节点
        this.nfNode = await this.save();
        await super.run();
    }

    /**
     * 保存当前状态
     */
    async save() {
        const em: EntityManager = await getEntityManager();
        const query: Query = em.createQuery(NfNode.name);
        let node = await query.select("*")
            .where({ "nfProcess": this.process.instance.processId, defId: this.id })
            .orderBy({ nodeId: "desc" })
            .getResult();
        //回滚则使用之前参数，否则使用现有变量
        const variables = node ? node.variables : JSON.stringify(this.process.getParam());
        node = new NfNode();
        node.nfProcess = this.process.instance;
        node.startTime = new Date().getTime();
        node.defId = this.id;
        node.nodeName = this.name;
        //设置指派人
        //默认为流程创始人
        if (this.process.instance.userId) {
            node.assignee = this.process.instance.userId
        }
        let arr;

        //
        if (this['candidateUsers']) {
            arr = await NFUserManager.getUserIdsByUserNames(this['candidateUsers']);
        } else if (this['candidateGroups']) {
            arr = await NFUserManager.getUserIdsByGroupNames(this['candidateGroups']);
        } else {  //默认为指派人（通常在发起人的第一个人工任务节点）
            arr = [node.assignee];
        }
        node.candidateUsers = ',' + arr.join(',') + ',';
        node.variables = variables;
        await node.save();
        await em.close();
        return node;
    }
}