"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NTaskNode = void 0;
const relaen_1 = require("relaen");
const nfnode_1 = require("../entity/nfnode");
const nnode_1 = require("./nnode");
/**
 * 人工任务
 */
class NTaskNode extends nnode_1.NNode {
    constructor(cfg, process) {
        super(cfg, process);
        //属性复制
        Object.assign(this, cfg);
    }
    /**
     * 结束任务
     * @param cfg       配置
     */
    async finish(cfg) {
        const em = await relaen_1.getEntityManager();
        const query = em.createQuery(nfnode_1.NfNode.name);
        const node = await query.select("*")
            .where({ "nfProcess": this.process.instance.processId, defId: this.id })
            .orderBy({ nodeId: "desc" })
            .getResult();
        if (node) {
            node.endTime = new Date().getTime();
            if (cfg) {
                node.isAgree = cfg.agree ? 1 : 0;
                node.reason = cfg.reason;
                node.userId = cfg.userId;
            }
            node.nfProcess = this.process.instance;
            await node.save();
        }
        await em.close();
    }
}
exports.NTaskNode = NTaskNode;
//# sourceMappingURL=ntasknode.js.map