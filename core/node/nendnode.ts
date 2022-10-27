import { NNode } from "./nnode";

export class NEndNode extends NNode{
    async run(){
        await this.process.end();
    }
}