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
})()