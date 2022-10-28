import { NTaskNode } from "./ntasknode";
/**
 * 人工任务
 */
export declare class NUserTaskNode extends NTaskNode {
    run(): Promise<void>;
    /**
     * 保存当前状态
     */
    save(): Promise<any>;
}
