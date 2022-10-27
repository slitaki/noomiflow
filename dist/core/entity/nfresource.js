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
exports.NfResource = void 0;
const relaen_1 = require("relaen");
const nfnode_1 = require("./nfnode");
let NfResource = class NfResource extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.resourceId = idValue;
    }
    async getNfNode() {
        return this['nfNode'] ? this['nfNode'] : await relaen_1.EntityProxy.get(this, 'nfNode');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'RESOURCE_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfResource.prototype, "resourceId", void 0);
__decorate([
    relaen_1.ManyToOne({ entity: 'NfNode' }),
    relaen_1.JoinColumn({
        name: 'NODE_INST_ID',
        refName: 'NODE_ID',
        nullable: true
    }),
    __metadata("design:type", nfnode_1.NfNode)
], NfResource.prototype, "nfNode", void 0);
__decorate([
    relaen_1.Column({
        name: 'RESOURCE_NAME',
        type: 'string',
        nullable: true,
        length: 256
    }),
    __metadata("design:type", String)
], NfResource.prototype, "resourceName", void 0);
__decorate([
    relaen_1.Column({
        name: 'RESOURCE_BYTE',
        type: 'string',
        nullable: true
    }),
    __metadata("design:type", String)
], NfResource.prototype, "resourceByte", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfResource.prototype, "ver", void 0);
NfResource = __decorate([
    relaen_1.Entity('NF_RESOURCE'),
    __metadata("design:paramtypes", [Number])
], NfResource);
exports.NfResource = NfResource;
//# sourceMappingURL=nfresource.js.map