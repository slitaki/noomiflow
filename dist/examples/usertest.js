"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relaen_1 = require("relaen");
const nfusermanager_1 = require("../core/nfusermanager");
const relaenconfig_1 = require("./relaenconfig");
async function addGroup() {
    nfusermanager_1.NFUserManager.addGroup(1, 'manager');
    nfusermanager_1.NFUserManager.addGroup(2, 'datacheck');
}
async function addUser() {
    nfusermanager_1.NFUserManager.addUser(1, 'admin', '管理员', [1]);
    nfusermanager_1.NFUserManager.addUser(2, 'yang', '杨雷', [2]);
}
(async function () {
    relaen_1.RelaenManager.init(relaenconfig_1.RelaenConfig);
    // await addGroup();
    // await addUser();
    console.log(await nfusermanager_1.NFUserManager.getUserIdsByGroupNames('manager,datacheck'));
    console.log(await nfusermanager_1.NFUserManager.getUserIdsByUserNames('yang'));
})();
//# sourceMappingURL=usertest.js.map