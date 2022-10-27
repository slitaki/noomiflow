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
exports.NfGroup = void 0;
const relaen_1 = require("relaen");
let NfGroup = class NfGroup extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.groupId = idValue;
    }
    async getNfGroupUsers() {
        return this['nfGroupUsers'] ? this['nfGroupUsers'] : await relaen_1.EntityProxy.get(this, 'nfGroupUsers');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'GROUP_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfGroup.prototype, "groupId", void 0);
__decorate([
    relaen_1.Column({
        name: 'GROUP_NAME',
        type: 'string',
        nullable: true,
        length: 64
    }),
    __metadata("design:type", String)
], NfGroup.prototype, "groupName", void 0);
__decorate([
    relaen_1.Column({
        name: 'REMARKS',
        type: 'string',
        nullable: true,
        length: 256
    }),
    __metadata("design:type", String)
], NfGroup.prototype, "rEMARKS", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfGroup.prototype, "ver", void 0);
__decorate([
    relaen_1.OneToMany({
        entity: 'NfGroupUser',
        mappedBy: 'nfGroup'
    }),
    __metadata("design:type", Array)
], NfGroup.prototype, "nfGroupUsers", void 0);
NfGroup = __decorate([
    relaen_1.Entity('NF_GROUP'),
    __metadata("design:paramtypes", [Number])
], NfGroup);
exports.NfGroup = NfGroup;
//# sourceMappingURL=nfgroup.js.map