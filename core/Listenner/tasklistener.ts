import { NFProcess } from "../nfprocess";
import { NFTask } from "../nftask";

//抽象类，任务监听类必须继承该类
export abstract class TaskListener {
    abstract notify(NFTask: NFTask);
}
// 全局监听器
export abstract class GlobalListener {
    abstract notify(proc: NFProcess)
}

