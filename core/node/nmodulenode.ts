import { EntityManager, getEntityManager, Query } from "relaen";
import { Ntask } from "../../dist/types/core/ntask";
import { NfNode } from "../entity/nfnode";
import { NFUserManager } from "../nfusermanager";
import { NNode } from "./nnode";
import { NTaskNode } from "./ntasknode";
/**
 * 可执行模块节点
 * 定义方法
 * @param process   当前流程
 * module.exports = function(process){
 *    //your code
 *      ....
 *    //可把结果写到process参数中
 *    
 * }
 */
export class NModuleNode extends NTaskNode {
    /**
     * 模块路径
     */
    modulePath: string;


    constructor(cfg, process) {
        super(cfg, process);
        this.modulePath = cfg.path;
    }

    async run() {
        this.nfNode = await this.save();
        await super.run();
        try {
            const parser = await import(this.modulePath);
            await parser(this.process);
            await this.process.next(this.nfNode.nodeId);
        } catch (e) {
            console.error(e);
        }
    }
    /**
     * 保存当前状态
     * @returns 
     */
    async save() {
        let node = new NfNode();
        node.nfProcess = this.process.instance;
        node.startTime = new Date().getTime();
        node.defId = this.id;
        node.nodeName = "ModuleTask";
        await node.save();
        return node;
    }
}