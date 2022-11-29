import { EntityManager, getEntityManager, RelaenManager } from "relaen";
import { NfDefProcess } from "./entity/nfdefprocess";
import { NfNode } from "./entity/nfnode";
import { NfProcess } from "./entity/nfprocess";
import { NFDeployProcess } from "./nfdeplyprocess";
import { NFProcess } from "./nfprocess";
/**
 * 流程引擎
 */
export class NFEngine {
    /**
     * 流程map
     */
    static processMap: Map<number, NFProcess> = new Map();

    /**
     * 定义流程
     * @param name      流程名
     * @param cfgStr    流程定义串 
     */
    private static async saveDefineProcess(cfg): Promise<NfDefProcess> {
        const defP: NfDefProcess = new NfDefProcess();
        defP.defName = cfg.name;
        defP.createTime = new Date().getTime();
        defP.dueTime = cfg.dueTime;
        defP.cfgStr = JSON.stringify(cfg.nodes);
        console.log("deploy succecessful");
        return <NfDefProcess>await defP.save();
    }
    /**
     * 部署流程
     * @param src  流程文件路径
     * todo
     */
    public static async defineProcess(src: string): Promise<NFDeployProcess> {
        const path = require('path').resolve(src);
        const str = require('fs').readFileSync(path);
        //读取json文件
        const procCfg = JSON.parse(str);
        //验证流程模型
        const isCorrct = this.varifyFlow(procCfg);
        if (isCorrct) {
            //存储流程模型
            let defProc: NfDefProcess = await this.saveDefineProcess(procCfg);
            let defProcIns = new NFDeployProcess(defProc);
            return defProcIns;
        } else {
            console.log("deploy resource error！");
        }
    }

    /**
     * 检验流程模型
     * todo
     */
    private static varifyFlow(procCfg: any) {
        return true;
    }
    /**
     * 创建流程实例
     * @param IdOrName 流程模型 id | name
     * @param instName 创建新流程实例的名称
     * @param userId 
     * @returns 
     */
    static async createProcess(IdOrName: string | number, instName: string, userId?: number): Promise<NFProcess> {
        var defP;
        if (typeof IdOrName === "string") {//流程部署名
            var defProc: NfDefProcess[] = <NfDefProcess[]>await NfDefProcess.findMany({ defName: IdOrName });
            //存在多个时选择最新的版本
            if (defProc.length > 1) {
                var def: NfDefProcess = defProc[0];
                for (let i = 0; i < defProc.length; ++i) {
                    if (defProc[i].createTime > def.createTime) {
                        def = defProc[i];
                    }
                }
                defP = def;
            } else {
                defP = defProc[0];
            }
        } else if (typeof IdOrName === "number") {//主键
            defP = <NfDefProcess>await NfDefProcess.find(IdOrName);
        }
        //流程不存在 流程字节不存在 
        if (!defP || !defP.cfgStr) {
            return;
        }
        //暂停流程定义
        if (defP.isSuspend === 1) {
            throw ("该流程定义已挂起");
        }
        let cfg = this.parseCfgStr(defP.cfgStr);
        const process = new NFProcess(cfg);
        //保存流程实例 
        //userId用于第一个任务节点的Assginee
        process.instance = await this.saveInstance(defP, instName, userId);
        //返回流程对象
        return process;
    }
    /**
     * 关闭流程
     * @param processId     流程id
     * @param reason        关闭理由
     */
    static async closeProcess(processId: number, reason?: string) {
        const proc = <NfProcess>await NfProcess.find(processId);
        if (!proc) {
            return;
        }
        proc.deleteReason = reason;
        proc.deleteTime = new Date().getTime();
        await proc.save();
        return true;
    }

    /**
     * 根据流程实例id获取流程实例
     */
    static async getInstanceById(procId: number): Promise<NFProcess> {
        //从缓存获取
        if (this.processMap.has(procId)) {
            return this.processMap.get(procId);
        }
        //从数据库获取 
        const proc = <NfProcess>await NfProcess.find(procId);
        if (!proc) {
            return null;
        }
        const defProc: NfDefProcess = await proc.getNfDefProcess();
        let cfg = this.parseCfgStr(defProc.cfgStr);
        const process = new NFProcess(cfg, proc);
        //将当前实例对应的任务实例加入Map
        await process.setMapCurrentNodes()
        //保存流程实例
        process.instance = proc;
        this.processMap.set(procId, process);
        return process;
    }
    /**
     * 根据流程名获取流程实例
     */
    //todo
    static async getInstanceByName() {

    }
    /**
     * 保存流程实例：流程流转时,新建和修改时需要保存当前流程的状况
     * @param defProc   流程定义
     * @param name      流程实例名
     * @param userId    用户id
     */
    public static async saveInstance(defProc: NfDefProcess, name: string, userId: number): Promise<NfProcess> {
        let proc: NfProcess = new NfProcess();
        proc.createTime = new Date().getTime();
        proc.userId = userId;
        proc.processName = name;
        if (defProc.dueTime) {
            proc.dueTime = proc.createTime + defProc.dueTime;
        }
        proc.nfDefProcess = defProc;
        proc = <NfProcess>await proc.save();
        return proc;
    }
    /**
     * 查询已部署的流程
     * @param defId //流程部署id
     * @returns 
     */
    public static async findDefProcByDefId(defId: number): Promise<NFDeployProcess> {
        //流程id
        let defProcess = <NfDefProcess>await NfDefProcess.find(defId);
        let nFDeployProc: NFDeployProcess = new NFDeployProcess(defProcess);
        return nFDeployProc;
    }

    public static async findDefProcBykeyWord(keyWord?: string): Promise<NfDefProcess[]> {
        //流程名 
        if (keyWord) {
            let defineProcess = <NfDefProcess[]>await NfDefProcess.findMany({ "keywords": keyWord });
            return defineProcess;
        }//查所有
        else {
            let defineProcess = <NfDefProcess[]>await NfDefProcess.findMany();
            return defineProcess;
        }
    }

    /**
     * 暂停流程定义
     * @param defId
     * @returns 
     */
    public static async suspendDefProcess(defId: number): Promise<boolean> {
        let defineProcess = <NfDefProcess>await NfDefProcess.find(defId);
        if (!defineProcess.isSuspend || defineProcess.isSuspend === 0) {
            defineProcess.isSuspend = 1;//挂起流程
            await defineProcess.save();
            return true;
        } else { //已经挂起了
            return false;
        }
    }

    /**
     * 激活流程
     * @param defId
     * @returns 
     */
    public static async invokeDefProcess(defId: number): Promise<boolean> {
        let defineProcess = <NfDefProcess>await NfDefProcess.find(defId);
        if (defineProcess.isSuspend == 1) {
            defineProcess.isSuspend = 0;//唤醒流程
            await defineProcess.save();
            return true;
        }
        else { //已经唤醒
            return false;
        }
    }

    /**
     * 解析流程字符串
     * @param cfgStr 
     * @returns 
     */
    private static parseCfgStr(cfgStr: string) {
        let cfg;
        try {
            cfg = JSON.parse(cfgStr);
            return cfg;
        } catch (e) {
            throw "流程定义错误!";
        }
    }
}