import { BaseEntity, Entity, Column, Id, OneToMany, EntityProxy } from 'relaen';
import { NfGroupUser } from './nfgroupuser';

@Entity('nf_group')
export class NfGroup extends BaseEntity {
	@Id()
	@Column({
		name: 'GROUP_ID',
		type: 'int',
		nullable: false
	})
	public groupId: number;

	@Column({
		name: 'GROUP_NAME',
		type: 'string',
		nullable: true,
		length: 64
	})
	public groupName: string;

	@Column({
		name: 'REMARKS',
		type: 'string',
		nullable: true,
		length: 256
	})
	public remarks: string;

	@Column({
		name: 'VER',
		type: 'int',
		nullable: true
	})
	public ver: number;

	@Column({
		name: 'USER_ID',
		type: 'int',
		nullable: true
	})
	public userId: number;

	@OneToMany({
		entity: 'NfGroupUser',
		mappedBy: 'nfGroup'
	})
	public nfGroupUsers: Array<NfGroupUser>;

	constructor(idValue?: number) {
		super();
		this.groupId = idValue;
	}
	public async getNfGroupUsers(): Promise<Array<NfGroupUser>> {
		return this['nfGroupUsers'] ? this['nfGroupUsers'] : await EntityProxy.get(this, 'nfGroupUsers');
	}
}