import { EntityManager, getEntityManager, Query } from "relaen";
import { NfNode } from "../entity/nfnode";
import { NFUserManager } from "../nfusermanager";
import { NNode } from "./nnode";
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
export class NModuleNode extends NNode{
    /**
     * 模块路径
     */
    modulePath:string;

    constructor(cfg,process){
        super(cfg,process);
        this.modulePath = cfg.path;
    }

    async run() {
        await super.run();
        try{
            const parser = await import(this.modulePath);
            await parser(this.process);
            this.process.next();
        }catch(e){
            console.error(e);
        }
    }
}