"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relaen_1 = require("relaen");
const nfengine_1 = require("../core/nfengine");
const nfusermanager_1 = require("../core/nfusermanager");
const relaenconfig_1 = require("./relaenconfig");
/**
 * 定义流程
 */
async function defineProcess() {
    const path = require('path').resolve('./examples/flows/flow2.json');
    const str = require('fs').readFileSync(path);
    const json = JSON.parse(str);
    await nfengine_1.NFEngine.defineProcess(json);
}
/**
 * 测试
 */
(async function () {
    relaen_1.RelaenManager.init(relaenconfig_1.RelaenConfig);
    // await defineProcess();
    // await (await NFEngine.createProcess('模块流程','模块流程2-管理员提交-20221020',1)).start();
    //用户流程设置参数
    const nodes = await nfusermanager_1.NFUserManager.getUnHandleNodes(1);
    const proc = await nfengine_1.NFEngine.getInstance(nodes.rows[0].nfProcess.processId, 1);
    proc.setParam('arr', [1, 2, 3, 4, 5]);
    await proc.next();
    console.log(proc.getParam());
    // const nodes = await NFEngine.getUnHandleNodes(2);
    // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId,2);
    // proc.setParam('agree',1);
    // await proc.next({userId:2,agree:1,reason:'审核通过'});
})();
//# sourceMappingURL=moduletest.js.map