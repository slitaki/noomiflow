import { Expression } from "./expression";
import { NStorage } from "./storage";

/**
 * 条件类
 */
export class FlowCondition{
    /**
     * 条件表达式
     */
    expression:Expression;

    /**
     * 流程id
     */
    processId:string;

    /**
     * 执行表达式
     * @returns 
     */
    public exec(){
        let param = NStorage.getProcessParamObj(this.processId);
        return this.expression.val(param);
    }
}