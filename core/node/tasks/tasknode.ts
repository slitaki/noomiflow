import { Expression } from "../../expression";
import { EAssignType, ETaskType } from "../../types";
import { FlowNode } from "../basenode";

/**
 * 任务
 */
export class TaskNode extends FlowNode{
    /**
     * 任务类型
     */
    type:ETaskType;

    /**
     * 资源id
     */
    resourceId:string;
}