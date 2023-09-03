import { eventListenType } from "../types";
import { NNode } from "./nnode";

export class NEndNode extends NNode {
    async run() {
        //执行end监听事件
        if (this.listener) {
            await this.process.doGlobalListner(this, eventListenType.END);
        }
        await this.process.end();
    }
}