import { Expression } from "../expression";
import { ENodeType } from "../types";
import { FlowNode } from "../node/basenode";

/**
 * 顺序流
 */
export class SequenceNode extends FlowNode{
    /**
     * 目标节点id
     */
    target:string;

    /**
     * 来源节点id
     */
    source:string;

    /**
     * 顺序流条件
     */
    condition?:Expression;

    /**
     * 构造器
     * @param id        节点id
     * @param target    目标节点id
     * @param source    来源节点id
     * @param expr      表达式串
     */
    constructor(id:string,target?:string,source?:string,expr?:string){
        super();
        this.id = id;
        this.nodeType = ENodeType.GATE;
        this.target = target;
        this.source = source;
        this.condition = new Expression(expr.trim());
    }
}
