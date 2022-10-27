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
exports.NfVariable = void 0;
const relaen_1 = require("relaen");
const nfprocess_1 = require("./nfprocess");
let NfVariable = class NfVariable extends relaen_1.BaseEntity {
    constructor(idValue) {
        super();
        this.variableId = idValue;
    }
    async getNfProcess() {
        return this['nfProcess'] ? this['nfProcess'] : await relaen_1.EntityProxy.get(this, 'nfProcess');
    }
};
__decorate([
    relaen_1.Id(),
    relaen_1.Column({
        name: 'VARIABLE_ID',
        type: 'int',
        nullable: false
    }),
    __metadata("design:type", Number)
], NfVariable.prototype, "variableId", void 0);
__decorate([
    relaen_1.ManyToOne({ entity: 'NfProcess' }),
    relaen_1.JoinColumn({
        name: 'PROCESS_ID',
        refName: 'PROCESS_ID',
        nullable: true
    }),
    __metadata("design:type", nfprocess_1.NfProcess)
], NfVariable.prototype, "nfProcess", void 0);
__decorate([
    relaen_1.Column({
        name: 'VARIABLE_NAME',
        type: 'string',
        nullable: true,
        length: 64
    }),
    __metadata("design:type", String)
], NfVariable.prototype, "variableName", void 0);
__decorate([
    relaen_1.Column({
        name: 'NUMBER_VALUE',
        type: 'double',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfVariable.prototype, "numberValue", void 0);
__decorate([
    relaen_1.Column({
        name: 'TEXT_VALUE',
        type: 'string',
        nullable: true,
        length: 4000
    }),
    __metadata("design:type", String)
], NfVariable.prototype, "textValue", void 0);
__decorate([
    relaen_1.Column({
        name: 'VAR_TYPE',
        type: 'string',
        nullable: true,
        length: 64
    }),
    __metadata("design:type", String)
], NfVariable.prototype, "varType", void 0);
__decorate([
    relaen_1.Column({
        name: 'CREATE_TIME',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfVariable.prototype, "createTime", void 0);
__decorate([
    relaen_1.Column({
        name: 'VER',
        type: 'int',
        nullable: true
    }),
    __metadata("design:type", Number)
], NfVariable.prototype, "vER", void 0);
NfVariable = __decorate([
    relaen_1.Entity('NF_VARIABLE'),
    __metadata("design:paramtypes", [Number])
], NfVariable);
exports.NfVariable = NfVariable;
//# sourceMappingURL=nfvariable.js.map