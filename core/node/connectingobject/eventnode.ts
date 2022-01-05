import { FlowNode } from "../basenode";
import { EEventType, ENodeType } from "../../types";

/**
 * 网关
 */
 export class EventNode extends FlowNode{
    /**
     * 网关类型
     */
    type:EEventType;

    /**
     * 构造器
     * @param id            节点id
     * @param type          事件类型
     */
    constructor(id:string,type?:EEventType){
        super();
        this.id = id;
        this.type = type;
        this.nodeType = ENodeType.EVENT;
    }

    /**
     * 执行
     * @param model 
     */
    public run(model?:Object):void{

    }
}
