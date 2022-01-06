import { EEventType } from "../../types";
import { FlowNode } from "../basenode";

export class EventNode extends FlowNode{
    /**
     * 事件类型
     */
    type:EEventType;


}