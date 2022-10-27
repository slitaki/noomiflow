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
exports.NfDefProcess = void 0;
const relaen_1 = require("relaen");
let NfDefProcess = class NfDefProcess extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.processDefId = idValue;
    }
    async getNfProcesss() {
        return this['nfProcesss'] ? this['nfProcesss'] : await relaen_1.EntityProxy.get(this, 'nfProcesss');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'PROCESS_DEF_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfDefProcess.prototype, "processDefId", void 0);
__decorate([
    relaen_1.Column({
        name: 'DEF_NAME',
        type: 'string',
        nullable: true,
        length: 255
    }),
    __metadata("design:type", String)
], NfDefProcess.prototype, "defName", void 0);
__decorate([
    relaen_1.Column({
        name: 'KEYWORDS',
        type: 'string',
        nullable: true,
        length: 256
    }),
    __metadata("design:type", String)
], NfDefProcess.prototype, "kEYWORDS", void 0);
__decorate([
    relaen_1.Column({
        name: 'DEF_TYPE',
        type: 'string',
        nullable: true,
        length: 256
    }),
    __metadata("design:type", String)
], NfDefProcess.prototype, "defType", void 0);
__decorate([
    relaen_1.Column({
        name: 'CREATE_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfDefProcess.prototype, "createTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'UPD_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfDefProcess.prototype, "updTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'CFG_STR',
        type: 'string',
        nullable: true,
        length: 4000
    }),
    __metadata("design:type", String)
], NfDefProcess.prototype, "cfgStr", void 0);
__decorate([
    relaen_1.Column({
        name: 'DUE_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfDefProcess.prototype, "dueTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfDefProcess.prototype, "ver", void 0);
__decorate([
    relaen_1.OneToMany({
        entity: 'NfProcess',
        mappedBy: 'nfDefProcess'
    }),
    __metadata("design:type", Array)
], NfDefProcess.prototype, "nfProcesss", void 0);
NfDefProcess = __decorate([
    relaen_1.Entity('NF_DEF_PROCESS'),
    __metadata("design:paramtypes", [Number])
], NfDefProcess);
exports.NfDefProcess = NfDefProcess;
//# sourceMappingURL=nfdefprocess.js.map