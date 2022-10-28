import { NNode } from "./nnode";

export class NStartNode extends NNode{
    async run(){
        const node = this.process.getSequenceNode(this.id);
        if(node){
            await node.run();
        }
    }
}