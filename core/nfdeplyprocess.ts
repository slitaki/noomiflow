import { NfDefProcess } from "./entity/nfdefprocess";

//部署资源
export class NFDeployProcess {
    private defProcess: NfDefProcess;
    constructor(deployProcess: NfDefProcess) {
        this.defProcess = deployProcess;
    }
    /**
     * 设置部署类型
     */
    public async setDefType(defType: string): Promise<this> {
        this.defProcess.defType = defType;
        await this.defProcess.save();
        return this;
    }
    /**
     * 设置流程模型截至时间
     * @param dueTime
     * @returns 
     */
    public async setDueTime(dueTime: number) {
        this.defProcess.dueTime = dueTime;
        await this.defProcess.save();
        return this;
    }

    public getResult() {
        return this.defProcess;
    }
}