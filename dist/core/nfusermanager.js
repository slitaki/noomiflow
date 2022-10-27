"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFUserManager = void 0;
const relaen_1 = require("relaen");
const nfgroup_1 = require("./entity/nfgroup");
const nfgroupuser_1 = require("./entity/nfgroupuser");
const nfuser_1 = require("./entity/nfuser");
class NFUserManager {
    /**
     * 添加用户
     * @param userId    用户id
     * @param userName  用户名
     * @param realName  真实姓名
     * @param groupIds  组id数组
     */
    static async addUser(userId, userName, realName, groupIds) {
        const user = new nfuser_1.NfUser(userId);
        user.userName = userName;
        user.realName = realName;
        await user.save();
        if (groupIds) {
            await this.setUserGroup(userId, groupIds);
        }
        return user;
    }
    /**
     * 添加组
     * @param groupId
     * @param groupName
     */
    static async addGroup(groupId, groupName) {
        const group = new nfgroup_1.NfGroup(groupId);
        group.groupName = groupName;
        return await group.save();
    }
    /**
     * 设置用户组信息
     * @param userId        用户id
     * @param groupIds      组id数组
     * @returns
     */
    static async setUserGroup(userId, groupIds) {
        const em = await relaen_1.getEntityManager();
        const user = await nfuser_1.NfUser.find(userId);
        if (!user) {
            return;
        }
        await nfgroupuser_1.NfGroupUser.deleteMany({ user: userId });
        if (!Array.isArray(groupIds)) {
            groupIds = [groupIds];
        }
        for (let id of groupIds) {
            let gu = new nfgroupuser_1.NfGroupUser();
            gu.nfUser = user;
            gu.nfGroup = new nfgroup_1.NfGroup(id);
            await gu.save();
        }
    }
    /**
     * 获取用户(通过组名)
     * @param groupNames
     */
    static async getUserIdsByGroupNames(groupNames) {
        //得到组名数组
        const arr = groupNames.split(',');
        const em = await relaen_1.getEntityManager();
        const query = em.createQuery(nfgroupuser_1.NfGroupUser.name);
        const rows = await query.select('nfUser.userId').where({ 'nfGroup.groupName': { rel: 'in', value: arr } }).getResultList();
        const users = [];
        for (let r of rows) {
            if (r.nfUser) {
                users.push(r.nfUser.userId);
            }
        }
        return users;
    }
    /**
     * 获取用户(通过组名)
     * @param groupNames
     */
    static async getUserIdsByUserNames(userNames) {
        //得到组名数组
        const arr = userNames.split(',');
        const em = await relaen_1.getEntityManager();
        const query = em.createQuery(nfuser_1.NfUser.name);
        const rows = await query.select('userId').where({ 'userName': { rel: 'in', value: arr } }).getResultList();
        const users = [];
        for (let r of rows) {
            users.push(r.userId);
        }
        return users;
    }
}
exports.NFUserManager = NFUserManager;
//# sourceMappingURL=nfusermanager.js.map