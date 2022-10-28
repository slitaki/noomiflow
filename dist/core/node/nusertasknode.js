"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUserTaskNode = void 0;
const relaen_1 = require("relaen");
const nfnode_1 = require("../entity/nfnode");
const nfusermanager_1 = require("../nfusermanager");
const ntasknode_1 = require("./ntasknode");
/**
 * 人工任务
 */
class NUserTaskNode extends ntasknode_1.NTaskNode {
    async run() {
        //保留实际节点
        this.nfNode = await this.save();
        await super.run();
    }
    /**
     * 保存当前状态
     */
    async save() {
        const em = await relaen_1.getEntityManager();
        const query = em.createQuery(nfnode_1.NfNode.name);
        let node = await query.select("*")
            .where({ "nfProcess": this.process.instance.processId, defId: this.id })
            .orderBy({ nodeId: "desc" })
            .getResult();
        //回滚则使用之前参数，否则使用现有变量
        const variables = node ? node.variables : JSON.stringify(this.process.getParam());
        node = new nfnode_1.NfNode();
        node.nfProcess = this.process.instance;
        node.startTime = new Date().getTime();
        node.defId = this.id;
        node.nodeName = this.name;
        //设置指派人
        node.assignee = this.process.instance.userId;
        let arr;
        if (this['candidateUsers']) {
            arr = await nfusermanager_1.NFUserManager.getUserIdsByUserNames(this['candidateUsers']);
        }
        else if (this['candidateGroups']) {
            arr = await nfusermanager_1.NFUserManager.getUserIdsByGroupNames(this['candidateGroups']);
        }
        else { //默认为指派人（通常在发起人的第一个人工任务节点）
            arr = [node.assignee];
        }
        node.candidateUsers = ',' + arr.join(',') + ',';
        node.variables = variables;
        await node.save();
        await em.close();
        return node;
    }
}
exports.NUserTaskNode = NUserTaskNode;
//# sourceMappingURL=nusertasknode.js.map