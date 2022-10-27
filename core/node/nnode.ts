import { NFProcess } from "../nfprocess";
import { ENodeType, INode } from "../types";

/**
 * 基础节点
 */
export class NNode{
    /**
     * 所属流程
     */
    process:NFProcess;

    /**
     * 节点名
     */
    name:string;

    /**
     * 类型
     */
    type:string;

    constructor(cfg:INode,process:NFProcess){
        this.name = cfg.name;
        this.process = process;
    }

    /**
     * 执行函数
     */
    async run(){
        if(this.type !== ENodeType.SEQUENCE){
            await this.process.setCurrentNode(this);
        }
    };
}