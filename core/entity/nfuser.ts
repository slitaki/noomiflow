import {BaseEntity,Entity,Column,Id,OneToMany,EntityProxy} from 'relaen';
import {NfGroupUser} from './nfgroupuser';

@Entity('NF_USER')
export class NfUser extends BaseEntity{
	@Id()
	@Column({
		name:'USER_ID',
		type:'int',
		nullable:false
	})
	public userId:number;

	@Column({
		name:'USER_NAME',
		type:'string',
		nullable:true,
		length:64
	})
	public userName:string;

	@Column({
		name:'REAL_NAME',
		type:'string',
		nullable:true,
		length:255
	})
	public realName:string;

	@Column({
		name:'EMAIL',
		type:'string',
		nullable:true,
		length:32
	})
	public eMAIL:string;

	@Column({
		name:'USER_PWD',
		type:'string',
		nullable:true,
		length:32
	})
	public userPwd:string;

	@Column({
		name:'ENABLED',
		type:'int',
		nullable:true
	})
	public eNABLED:number;

	@Column({
		name:'VER',
		type:'int',
		nullable:true
	})
	public ver:number;

	@OneToMany({
		entity:'NfGroupUser',
		mappedBy:'nfUser'
	})
	public nfGroupUsers:Array<NfGroupUser>;

	constructor(idValue?:number){
		super();
		this.userId = idValue;
	}
	public async getNfGroupUsers():Promise<Array<NfGroupUser>>{
		return this['nfGroupUsers']?this['nfGroupUsers']:await EntityProxy.get(this,'nfGroupUsers');
	}
}