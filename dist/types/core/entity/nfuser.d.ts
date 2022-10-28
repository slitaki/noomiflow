import { BaseEntity } from 'relaen';
import { NfGroupUser } from './nfgroupuser';
export declare class NfUser extends BaseEntity {
    userId: number;
    userName: string;
    realName: string;
    eMAIL: string;
    userPwd: string;
    eNABLED: number;
    ver: number;
    nfGroupUsers: Array<NfGroupUser>;
    constructor(idValue?: number);
    getNfGroupUsers(): Promise<Array<NfGroupUser>>;
}
