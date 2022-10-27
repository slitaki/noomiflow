import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,EntityProxy} from 'relaen';
import {NfUser} from './nfuser';
import {NfGroup} from './nfgroup';

@Entity('NF_GROUP_USER')
export class NfGroupUser extends BaseEntity{
	@Id()
	@Column({
		name:'ID_',
		type:'int',
		nullable:false
	})
	public id:number;

	@ManyToOne({entity:'NfUser'})
	@JoinColumn({
		name:'USER_ID',
		refName:'USER_ID',
		nullable:true
	})
	public nfUser:NfUser;

	@ManyToOne({entity:'NfGroup'})
	@JoinColumn({
		name:'GROUP_ID',
		refName:'GROUP_ID',
		nullable:true
	})
	public nfGroup:NfGroup;

	constructor(idValue?:number){
		super();
		this.id = idValue;
	}
	public async getNfUser():Promise<NfUser>{
		return this['nfUser']?this['nfUser']:await EntityProxy.get(this,'nfUser');
	}
	public async getNfGroup():Promise<NfGroup>{
		return this['nfGroup']?this['nfGroup']:await EntityProxy.get(this,'nfGroup');
	}
}