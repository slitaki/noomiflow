import { worker } from "cluster";
import { NStorage } from "../storage";
import { WorkFlow } from "./workflow";

/**
 * 流程引擎类
 */
export class NEngine{
    public static create(cfgFile:string){
        let str = require('fs').readFileSync(cfgFile);
        try{
            const json = JSON.parse(str);
            NStorage.saveFlow(new WorkFlow(json));
        }catch(e){
            throw 'flow config is wrong';
        }
    }

    /**
     * 启动流程
     * @param flow 
     */
    public static start(flow:WorkFlow){
        flow.run(true);
    }
}