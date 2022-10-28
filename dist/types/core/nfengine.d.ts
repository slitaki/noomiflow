import { NfDefProcess } from "./entity/nfdefprocess";
import { NfProcess } from "./entity/nfprocess";
import { NFProcess } from "./nfprocess";
/**
 * 流程引擎
 */
export declare class NFEngine {
    /**
     * 流程map
     */
    static processMap: Map<number, NFProcess>;
    /**
     * 定义流程
     * @param name      流程名
     * @param cfgStr    流程定义串
     */
    static defineProcess(cfg: any): Promise<void>;
    /**
     * 创建流程实例
     * @param defName   流程定义名
     * @param instName  流程实例名
     * @returns     流程实例
     */
    static createProcess(defName: string, instName: string, userId?: number): Promise<NFProcess>;
    /**
     * 关闭流程
     * @param processId     流程id
     * @param reason        关闭理由
     */
    static closeProcess(processId: number, reason?: string): Promise<boolean>;
    /**
     * 获取流程实例
     */
    static getInstance(procId: number, userId: number): Promise<NFProcess>;
    /**
     * 保存流程实例
     * @param defProc   流程定义
     * @param name      流程实例名
     * @param userId    用户id
     */
    static saveInstance(defProc: NfDefProcess, name: string, userId: number): Promise<NfProcess>;
}
