"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEndNode = void 0;
const nnode_1 = require("./nnode");
class NEndNode extends nnode_1.NNode {
    async run() {
        await this.process.end();
    }
}
exports.NEndNode = NEndNode;
//# sourceMappingURL=nendnode.js.map