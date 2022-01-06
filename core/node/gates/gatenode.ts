import { FlowNode } from "../basenode";
import { EGateType, ENodeType } from "../../types";

/**
 * 网关
 */
 export class GateNode extends FlowNode{
    /**
     * 网关类型
     */
    type:EGateType;

    /**
     * 默认流id（inclusive时有效）
     */
    default?:string;

    /**
     * 来源顺序流数组
     */
    sourceSeqs:Array<string>;

    /**
     * 目标顺序流id
     */
    targetSeqs:Array<string>;

    /**
     * 构造器
     * @param id            节点id
     * @param type          网关类型
     * @param defaultId     默认顺序流id
     */
    constructor(id:string,type?:EGateType,defaultId?:string){
        super();
        this.id = id;
        this.type = type;
        this.default = defaultId;
        this.nodeType = ENodeType.GATE;
    }

    /**
     * 执行
     * @param model 
     */
    public run(model?: any): void {

    }

    /**
     * 添加来源顺序流
     * @param seqId     顺序流id
     */
    public addSourceSeq(seqId:string){
        if(!this.sourceSeqs){
            this.sourceSeqs = [];
        }
        this.sourceSeqs.push(seqId);
    }


    /**
     * 添加来源顺序流
     * @param seqId     顺序流id
     */
    public addTargetSeq(seqId:string){
        if(!this.targetSeqs){
            this.targetSeqs = [];
        }
        this.targetSeqs.push(seqId);
    }
}
