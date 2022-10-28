import { BaseEntity } from 'relaen';
import { NfGroupUser } from './nfgroupuser';
export declare class NfGroup extends BaseEntity {
    groupId: number;
    groupName: string;
    rEMARKS: string;
    ver: number;
    nfGroupUsers: Array<NfGroupUser>;
    constructor(idValue?: number);
    getNfGroupUsers(): Promise<Array<NfGroupUser>>;
}
