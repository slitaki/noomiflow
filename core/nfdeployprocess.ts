import { EntityManager, getEntityManager } from "relaen";
import { NfDefProcess } from "./entity/nfdefprocess";

//部署资源
export class NFDeployProcess {
    private defProcess: NfDefProcess;
    constructor(deployProcess: NfDefProcess) {
        this.defProcess = deployProcess;
    }

    /**
    * 查询最新版本
    * @param defName 流程名
    */
    public static async findLastestVersion(defName): Promise<NfDefProcess> {
        let em: EntityManager = await getEntityManager();
        let query = em.createQuery(NfDefProcess.name);
        let defProc: NfDefProcess = await query.select("*")
            .where({ defName: defName })
            .orderBy({
                "ver": "desc"
            })
            .getResult();
        return defProc;
    }

    /**
    * 定义流程
    * @param cfg    流程定义串 
    */
    public static async saveDefineProcess(cfg: any): Promise<NfDefProcess> {
        let lastDefProc: NfDefProcess = await this.findLastestVersion(cfg.name);
        const defP: NfDefProcess = new NfDefProcess();
        defP.defName = cfg.name;
        defP.createTime = new Date().getTime();
        defP.dueTime = cfg.dueTime;
        defP.ver = lastDefProc ? lastDefProc.ver + 1 : 1;
        defP.cfgStr = JSON.stringify(cfg.nodes);
        return <NfDefProcess>await defP.save();
    }

    /**
     * 设置部署类型
     */
    public async setDefType(defType: string): Promise<this> {
        this.defProcess.defType = defType;
        return this;
    }
    /**
     * 设置流程模型截至时间
     * @param dueTime
     * @returns 
     */
    public async setDueTime(dueTime: number) {
        this.defProcess.dueTime = dueTime;
        return this;
    }

    /**
     * 返回定义的流程模型
     * @returns 
     */
    public getDefProcess(): NfDefProcess {
        return this.defProcess;
    }
    public getProDefID() {
        return this.defProcess.processDefId;
    }

    /**
     * 部署该流程
     */
    public async deploy() {
        await this.defProcess.save();
    }
}