import { BaseEntity } from 'relaen';
import { NfUser } from './nfuser';
import { NfGroup } from './nfgroup';
export declare class NfGroupUser extends BaseEntity {
    id: number;
    nfUser: NfUser;
    nfGroup: NfGroup;
    constructor(idValue?: number);
    getNfUser(): Promise<NfUser>;
    getNfGroup(): Promise<NfGroup>;
}
