import { NfUser } from "./entity/nfuser";
export declare class NFUserManager {
    /**
     * 添加用户
     * @param userId    用户id
     * @param userName  用户名
     * @param realName  真实姓名
     * @param groupIds  组id数组
     */
    static addUser(userId: any, userName: any, realName?: string, groupIds?: number[]): Promise<NfUser>;
    /**
     * 添加组
     * @param groupId
     * @param groupName
     */
    static addGroup(groupId: any, groupName: any): Promise<import("relaen/dist/types/core/types").IEntity>;
    /**
     * 设置用户组信息
     * @param userId        用户id
     * @param groupIds      组id数组
     * @returns
     */
    static setUserGroup(userId: any, groupIds: number | number[]): Promise<void>;
    /**
     * 获取用户(通过组名)
     * @param groupNames
     */
    static getUserIdsByGroupNames(groupNames: string): Promise<NfUser[]>;
    /**
     * 获取用户(通过组名)
     * @param groupNames
     */
    static getUserIdsByUserNames(userNames: string): Promise<NfUser[]>;
}