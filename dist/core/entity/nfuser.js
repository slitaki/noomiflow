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
exports.NfUser = void 0;
const relaen_1 = require("relaen");
let NfUser = class NfUser extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.userId = idValue;
    }
    async getNfGroupUsers() {
        return this['nfGroupUsers'] ? this['nfGroupUsers'] : await relaen_1.EntityProxy.get(this, 'nfGroupUsers');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'USER_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfUser.prototype, "userId", void 0);
__decorate([
    relaen_1.Column({
        name: 'USER_NAME',
        type: 'string',
        nullable: true,
        length: 64
    }),
    __metadata("design:type", String)
], NfUser.prototype, "userName", void 0);
__decorate([
    relaen_1.Column({
        name: 'REAL_NAME',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfUser.prototype, "realName", void 0);
__decorate([
    relaen_1.Column({
        name: 'EMAIL',
        type: 'string',
        nullable: true,
        length: 32
    }),
    __metadata("design:type", String)
], NfUser.prototype, "eMAIL", void 0);
__decorate([
    relaen_1.Column({
        name: 'USER_PWD',
        type: 'string',
        nullable: true,
        length: 32
    }),
    __metadata("design:type", String)
], NfUser.prototype, "userPwd", void 0);
__decorate([
    relaen_1.Column({
        name: 'ENABLED',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfUser.prototype, "eNABLED", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfUser.prototype, "ver", void 0);
__decorate([
    relaen_1.OneToMany({
        entity: 'NfGroupUser',
        mappedBy: 'nfUser'
    }),
    __metadata("design:type", Array)
], NfUser.prototype, "nfGroupUsers", void 0);
NfUser = __decorate([
    relaen_1.Entity('NF_USER'),
    __metadata("design:paramtypes", [Number])
], NfUser);
exports.NfUser = NfUser;
//# sourceMappingURL=nfuser.js.map