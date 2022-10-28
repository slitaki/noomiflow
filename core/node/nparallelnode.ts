import { NNode } from "./nnode";
import { INode } from "../types";
import { NSequenceNode } from "./nsequencenode";
import { NFProcess } from "../nfprocess";


export class NParallelNode extends NNode{
    /**
     * 出口顺序流
     */
    outSequences:NSequenceNode[];

    /**
     * 入口顺序流
     */
    inSequences:NSequenceNode[];

    /**
     * 执行剩余数量
     */
    inCount:number;
    
    constructor(cfg:INode,process:NFProcess){
        super(cfg,process);
    }
    
    async run() {
        await super.run();
        //执行一次，则计数器-1，到0时，表示网关可以进行下一步
        if(--this.inCount === 0){
            for(let node of this.outSequences){
                await node.run();
            }
        }
    }

    init(){
        this.outSequences = this.process.getSequenceNodes(this.id);
        this.outSequences = this.process.getSequenceNodes(this.id);
        this.inSequences = this.process.getSequenceNodes(this.id,true);
        if(!this.outSequences || this.outSequences.length === 0 || !this.inSequences || this.inSequences.length === 0){
            throw `节点'${this.name}'配置错误!`;
        }
        this.inCount = this.inSequences.length;
    }
}