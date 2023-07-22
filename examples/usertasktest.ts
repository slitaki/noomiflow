import { RelaenManager } from "relaen";
import { NFEngine } from "../core/nfengine";
import { NFUserManager } from "../core/nfusermanager";
import { RelaenConfig } from "./relaenconfig";

/**
 * 定义流程
 */
async function defineProcess() {
    const path = require('path').resolve('./examples/flows/flow3.json');
    const str = require('fs').readFileSync(path);
    const json = JSON.parse(str);
    await NFEngine.deployProcess(json);
}

/**
 * 创建流程
 */
async function createProcess() {
    return await NFEngine.createProcess('人工审核流程', '测试流程2-管理员提交-20221031', 1);
}

/**
 * 测试
 */
(async function () {
    RelaenManager.init(RelaenConfig);
    let def = await defineProcess();
    // console.log("已部署请假流程");
    //创建实例
    // let proc1 = await NFEngine.createProcess("这是请假流程", "测试请假流程-20221109", 1);
    //获取流程实例
    let proc2 = await NFEngine.getInstanceById(5);
    // proc2.setVariablesParam('data', 2);
    // await proc2.next();
    const tasks = await NFUserManager.getHandledNodes(1);
    console.log(tasks[0]);
})()


/**
 *测试用户需要处理的任务
 */
// (async function getUserTask() {
//         let taskNodes = await NFTask.getTasksByCadidateName("hwh");
//         for (let t of taskNodes) {
//             console.log(t);
//             if (t.nodeId == 38) {
//                 let process = await NFEngine.getInstanceById(t.nfProcess.processId);
//                 console.log(process);
//             }
//         }
// })()

// (async function () {
//     RelaenManager.init(RelaenConfig);
//     // let def = await NFEngine.findDefProcess("人工审核流程");
//     // console.log(def);
//     // await NFEngine.suspendDefProcess(1);
//     // let proci = await createProcess();
//     // await createProcess();
//     //获取流程实例
//     // const proc = await NFEngine.getInstance(4);
//     // proc.start();
//     // 取用户1的所有未处理流程
//     const nodes = await NFUserManager.getUnHandleNodes(1);
//     console.log(nodes);
//     // 执行节点，根据参数直接end
//     const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId);
//     proc.setParam('data', 1);
//     await proc.next({ userId: 1 });
//     //根据参数跳转到task2
//     // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId, 1);
//     // proc.setParam('data', 2);
//     // await proc.next({ userId: 1 });
//     //task2审核不通过
//     // const nodes = await NFUserManager.getUnHandleNodes(1);
//     // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId, 1);
//     // proc.setParam('agree', 0);
//     // await proc.next({ userId: 2, agree: 0, reason: '资料不齐' });
//     //task2 审核通过，结束
//     // const nodes = await NFUserManager.getUnHandleNodes(2);
//     // const proc = await NFEngine.getInstance(nodes.rows[0].nfProcess.processId,2);
//     // proc.setParam('agree',1);
//     // await proc.next({userId:2,agree:1,reason:'审核通过'});
//     // await NFEngine.findInstance();
// })();