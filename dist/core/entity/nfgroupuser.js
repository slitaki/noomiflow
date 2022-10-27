"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NfGroupUser = void 0;
const relaen_1 = require("relaen");
const nfuser_1 = require("./nfuser");
const nfgroup_1 = require("./nfgroup");
let NfGroupUser = class NfGroupUser extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.id = idValue;
    }
    async getNfUser() {
        return this['nfUser'] ? this['nfUser'] : await relaen_1.EntityProxy.get(this, 'nfUser');
    }
    async getNfGroup() {
        return this['nfGroup'] ? this['nfGroup'] : await relaen_1.EntityProxy.get(this, 'nfGroup');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'ID_',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfGroupUser.prototype, "id", void 0);
__decorate([
    relaen_1.ManyToOne({ entity: 'NfUser' }),
    relaen_1.JoinColumn({
        name: 'USER_ID',
        refName: 'USER_ID',
        nullable: true
    }),
    __metadata("design:type", nfuser_1.NfUser)
], NfGroupUser.prototype, "nfUser", void 0);
__decorate([
    relaen_1.ManyToOne({ entity: 'NfGroup' }),
    relaen_1.JoinColumn({
        name: 'GROUP_ID',
        refName: 'GROUP_ID',
        nullable: true
    }),
    __metadata("design:type", nfgroup_1.NfGroup)
], NfGroupUser.prototype, "nfGroup", void 0);
NfGroupUser = __decorate([
    relaen_1.Entity('NF_GROUP_USER'),
    __metadata("design:paramtypes", [Number])
], NfGroupUser);
exports.NfGroupUser = NfGroupUser;
//# sourceMappingURL=nfgroupuser.js.map