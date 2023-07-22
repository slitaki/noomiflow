import { EntityManager, getEntityManager, Query } from "relaen";
import { NfNode } from "../entity/nfnode";
import { NFProcess } from "../nfprocess";
import { INode } from "../types";
import { NNode } from "./nnode";
import { NfHiNodeInst } from "../entity/nfhinodeinst";

/**
 * 任务
 */
export class NTaskNode extends NNode {
    /**
     * 对应实例实体
     */
    public nfNode: NfNode;

    constructor(cfg: INode, process: NFProcess) {
        super(cfg, process);
        //属性复制
        Object.assign(this, cfg);
    }

    /**
     * 结束任务
     * @param cfg  {agree,reason,userId}
     */
    async finish(cfg?) {
        const em: EntityManager = await getEntityManager();
        const query: Query = em.createQuery(NfNode.name);
        const node = <NfNode>await query.select("*")
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
            // node.variables = JSON.stringify(await this.process.getParam(node.defId))
            await node.save();
        }
        //保存历史节点
        const hisInst: NfHiNodeInst = new NfHiNodeInst();
        hisInst.nodeId = node.nodeId;
        hisInst.processId = node.nfProcess.processId;
        //hisInst.processDefId= node.nfProcess.
        hisInst.nodeName = node.defId;
        hisInst.nodeType = node.nodeType;
        hisInst.assignee = node.assignee;
        hisInst.startTime = node.startTime;
        hisInst.endTime = node.endTime;
        hisInst.durationTime = node.endTime - node.startTime;
        // todo 跳转节点 ver
        // hisInst.deleteStatus = 1 
        await hisInst.save();
        await em.close();
    }
}