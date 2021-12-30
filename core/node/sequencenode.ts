import { Expression } from "../expression";
import { ENodeType } from "../types";
import { FlowNode } from "./basenode";

/**
 * 顺序流
 */
export class SequenceNode extends FlowNode{
    /**
     * 目标节点id
     */
    targetRef:string;

    /**
     * 来源节点id
     */
    sourceRef:string;

    /**
     * 顺序流条件
     */
    condition?:Expression;

    /**
     * 构造器
     * @param id            节点id
     * @param targetRef     目标节点id
     * @param sourceRef     来源节点id
     * @param expr          表达式串
     */
    constructor(id:string,targetRef?:string,sourceRef?:string,expr?:string){
        super();
        this.id = id;
        this.nodeType = ENodeType.GATE;
        this.targetRef = targetRef;
        this.sourceRef = sourceRef;
        this.condition = new Expression(expr.trim());
    }
}
