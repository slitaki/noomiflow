import { listener } from "../../core/Listenner/decorator";
import { GlobalListener, TaskListener } from "../../core/Listenner/tasklistener";
import { NfUser } from "../../core/entity/nfuser";
import { NFProcess } from "../../core/nfprocess";
import { NFTask } from "../../core/nftask";


@listener("start")
export class MyListener extends GlobalListener {
    async notify(proc: NFProcess) {
        console.log(" 任务开始了");
        // let user: NfUser = <NfUser>await NfUser.find(1);
        // console.log("处理人为" + user.userName);
    }
}
@listener("end")
export class EndListener extends GlobalListener {
    notify(proc: NFProcess) {
        console.log("任务结束了")
    }
}
@listener("take")
export class TakeListener extends GlobalListener {
    notify(proc: NFProcess) {
        console.log("任务进行中")
    }
}
@listener("create")
export class createListener extends TaskListener {
    notify(NFTask: NFTask) {

    }
}
