import { EntityManager, getEntityManager, Query } from "relaen";
import { NfGroup } from "./entity/nfgroup";
import { NfGroupUser } from "./entity/nfgroupuser";
import { NfNode } from "./entity/nfnode";
import { NfProcess } from "./entity/nfprocess";
import { NfUser } from "./entity/nfuser";


export class NFUserManager {
    /**
     * 添加用户
     * @param userId    用户id
     * @param userName  用户名
     * @param realName  真实姓名
     * @param groupIds  组id数组
     */
    static async addUser(userId, userName, realName?: string, groupIds?: number[]) {
        const user: NfUser = new NfUser(userId);
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
        const group: NfGroup = new NfGroup(groupId);
        group.groupName = groupName;
        return await group.save();
    }

    /**
     * 设置用户组信息
     * @param userId        用户id
     * @param groupIds      组id数组
     * @returns 
     */
    static async setUserGroup(userId, groupIds: number | number[]) {
        const em: EntityManager = await getEntityManager();
        const user = <NfUser>await NfUser.find(userId);
        if (!user) {
            return;
        }
        await NfGroupUser.deleteMany({ user: userId });
        if (!Array.isArray(groupIds)) {
            groupIds = [groupIds];
        }
        for (let id of groupIds) {
            let gu: NfGroupUser = new NfGroupUser();
            gu.nfUser = user;
            gu.nfGroup = new NfGroup(id);
            await gu.save();
        }
    }

    /**
     * 获取用户(通过组名)
     * @param groupNames 
     */
    static async getUserIdsByGroupNames(groupNames: string): Promise<NfUser[]> {
        //得到组名数组
        const arr = groupNames.split(',');
        const em: EntityManager = await getEntityManager();
        const query: Query = em.createQuery(NfGroupUser.name);
        const rows = <NfGroupUser[]>await query.select('nfUser.userId').where({ 'nfGroup.groupName': { rel: 'in', value: arr } }).getResultList();
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
    static async getUserIdsByUserNames(userNames: string): Promise<NfUser[]> {
        //得到组名数组
        const arr = userNames.split(',');
        const em: EntityManager = await getEntityManager();
        const query: Query = em.createQuery(NfUser.name);
        const rows = <NfUser[]>await query.select('userId').where({ 'userName': { rel: 'in', value: arr } }).getResultList();
        const users = [];
        for (let r of rows) {
            users.push(r.userId);
        }
        return users;
    }

    /**
     * 获取用户待处理流程节点
     * @param userId    用户id
     * @returns         {total:流程数,rows:节点数组}
     */
    public static async getUnHandleNodes(userId: number, pageNo?: number, pageSize?: number): Promise<any> {
        //todo 提示没有该节点
        return await this.getNodes({
            candidateUsers: { rel: 'like', value: ',' + userId + ',' },
            endTime: null
        }, pageNo, pageSize)
    }

    /**
     * 获取用户处理的所有流程(任务)节点
     * @param userId    用户id
     * @returns         {total:流程数,rows:节点数组}
     */
    public static async getHandledNodes(userId: number, pageNo?: number, pageSize?: number): Promise<any> {
        return await this.getNodes({
            userId: userId
        }, pageNo, pageSize)
    }

    /**
     * 获取流程节点
     * @param param     参数对象
     * @param pageNo    页号
     * @param pageSize  页面大小
     */
    private static async getNodes(param: any, pageNo?: number, pageSize?: number) {
        const em: EntityManager = await getEntityManager();
        const query: Query = em.createQuery(NfNode.name);
        let start = 0;
        if (pageNo > 0 && pageSize > 0) {
            start = (pageNo - 1) * pageSize;
        }
        const nodes = <NfNode[]>await query.select(['*', 'nfProcess.*']).where(param).getResultList(start, pageSize);
        const total = await em.getCount(NfNode.name, param);
        for (let n of nodes) {
            await n.getNfResources();
        }
        await em.close();
        return { total: total, rows: nodes }
    }

    /**
     * 获取用户发起的流程
     * @param userId    用户id
     * @returns         {total:流程数,rows:节点数组}
     */
    public static async getCreatedProcess(userId: number, pageNo?: number, pageSize?: number): Promise<any> {
        const em: EntityManager = await getEntityManager();
        const query: Query = em.createQuery(NfProcess.name);
        const param = {
            userId: userId
        }
        let start = 0;
        if (pageNo > 0 && pageSize > 0) {
            start = (pageNo - 1) * pageSize;
        }
        const nodes = <NfProcess[]>await query.select(['*']).where(param).getResultList(start, pageSize);
        const total = await em.getCount(NfProcess.name, param);
        await em.close();
        return { total: total, rows: nodes }
    }
}