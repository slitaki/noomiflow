import { TaskNode } from "./tasknode";
/**
 * user任务
 */
export class ScriptTask extends TaskNode{
    /**
     * 执行函数
     */
    private execFunc:Function;

    constructor(config:any){
        super(config.id,config.name);
        if(!config.script){
            return;
        }
        this.execFunc = new Function('$model',`return ` + config.script);
    }
}