"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptTask = void 0;
const tasknode_1 = require("./tasknode");
/**
 * user任务
 */
class ScriptTask extends tasknode_1.TaskNode {
    constructor(config) {
        super(config.id, config.name);
        if (!config.script) {
            return;
        }
        this.execFunc = new Function('$model', `return ` + config.script);
    }
}
exports.ScriptTask = ScriptTask;
//# sourceMappingURL=scripttask.js.map