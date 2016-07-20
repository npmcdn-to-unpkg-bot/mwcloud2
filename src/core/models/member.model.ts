import { BaseModel } from './base.model';
import { GenderType } from '../enums/mw.enum';
import { environment } from '../../environment';

export class MemberModel extends BaseModel {
    memberNo: string;
    name: string;
    mobile: string;
    gender:GenderType;
    avatarId:number;
    avatarPath:string;
    //constructor(id: number);
    constructor(id?: number, memberNo?: string, name?: string, mobile?: string) {
        super(id);
        if (id) {
            this.memberNo = memberNo;
            this.name = name;
            this.mobile = mobile;
        }else{
        	this.memberNo = "0";
            this.name = "散客";
            this.mobile = "";
        }
    }

    serializer(model:any){
        super.serializer(model.id);
        if(model.id){
        	this.avatarId = model.avatarId;
            this.avatarPath = environment.filePath+model.avatarId;
        	this.memberNo = model.memberNo;
        	this.name = model.name;
        	this.mobile = model.mobile;
            this.gender = +model.gender;
        }else{
        	//散客
        	this.id = 0;
        	this.name = "散客";
        }
        if(!this.avatarId){
            this.avatarPath = environment.localImagePath+"default_female.png";
        }
        if(!this.gender){
            this.gender = GenderType.female;
        }
        return this;
    }
}
