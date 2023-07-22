import { RelaenManager } from "relaen";
import { NFEngine } from "../core/nfengine";
import { NFUserManager } from "../core/nfusermanager";
import { RelaenConfig } from "./relaenconfig";

/**
 * 定义流程
 */
async function deployProcess() {
    const path = require('path').resolve('./examples/flows/flow2.json');
    const str = require('fs').readFileSync(path);
    await NFEngine.deployProcess(str);
}


/**
 * 测试
 */
(async function () {
    RelaenManager.init(RelaenConfig);
    await deployProcess();
    // await (await NFEngine.createProcess('模块流程','模块流程2-管理员提交-20221020',1)).start();

    //用户流程设置参数
    const nodes = await NFUserManager.getUnHandleNodes(1);
    // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId, 1);
    // proc.setParam('arr',[1,2,3,4,5]);
    // await proc.next();
    // console.log(proc.getParam());

    // const nodes = await NFEngine.getUnHandleNodes(2);
    // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId,2);
    // proc.setParam('agree',1);
    // await proc.next({userId:2,agree:1,reason:'审核通过'});
})();