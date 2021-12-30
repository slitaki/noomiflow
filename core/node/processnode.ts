import { ENodeType } from "../types";
import { FlowNode } from "./basenode";

/**
 * 子流程节点
 */
export class ProcessNode extends FlowNode{
    /**
     * 引用流程名
     */
    refName:string;

    /**
     * 构造器
     * @param id            节点id
     */
     constructor(id:string){
        super();
        this.id = id;
        this.nodeType = ENodeType.PROCESS;
    }
}