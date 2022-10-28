"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NStartNode = void 0;
const nnode_1 = require("./nnode");
class NStartNode extends nnode_1.NNode {
    async run() {
        const node = this.process.getSequenceNode(this.id);
        if (node) {
            await node.run();
        }
    }
}
exports.NStartNode = NStartNode;
//# sourceMappingURL=nstartnode.js.map