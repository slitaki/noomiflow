import { RelaenManager } from "relaen";
import { NfUser } from "../core/entity/nfuser";
import { NFUserManager } from "../core/nfusermanager";
import { RelaenConfig } from "./relaenconfig";



async function addGroup(){
    NFUserManager.addGroup(1,'manager');
    NFUserManager.addGroup(2,'datacheck');
}

async function addUser(){
    NFUserManager.addUser(1,'admin','管理员',[1]);
    NFUserManager.addUser(2,'yang','杨雷',[2]);
}

(async function(){
    RelaenManager.init(RelaenConfig);

    // await addGroup();
    // await addUser();
    console.log(await NFUserManager.getUserIdsByGroupNames('manager,datacheck'));
    console.log(await NFUserManager.getUserIdsByUserNames('yang'))
    // 获取用户未处理流程节点
    console.log(await NFUserManager.getUnHandleNodes(2,1,1));
    // 获取用户处理的流程节点
    console.log(await NFUserManager.getHandledNodes(2,1,1));
    //获取用户创建的流程
    console.log(await NFUserManager.getCreatedProcess(1,1,1));
})()