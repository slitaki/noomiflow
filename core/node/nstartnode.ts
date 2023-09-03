import { eventListenType } from "../types";
import { NNode } from "./nnode";

export class NStartNode extends NNode {
    async run() {
        const node = this.process.getSequenceNode(this.id);
        if (node) {
            if (this.listener) {
                this.process.doGlobalListner(this, eventListenType.START);
            }
            await node.run();
            //执行流程开始监听事件

        }
    }
}