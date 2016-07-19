import { BaseModel } from './base.model';
import { GenderType } from '../enums/mw.enum';

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

    static serializer(model:any,member_id:number):MemberModel{
        if(!model){
            return null;
        }
        let member_model : MemberModel = new MemberModel(model.id?model.id:member_id);
        if(model.id || member_id){
        	//member_model.id = model.id?model.id:member_id;
        	member_model.avatarId = model.avatarId;
            member_model.avatarPath = "http://newtest.mei1.com/api/file/"+model.avatarId;
        	member_model.memberNo = model.memberNo;
        	member_model.name = model.name;
        	member_model.mobile = model.mobile;
            member_model.gender = +model.gender;
        }else{
        	//散客
        	member_model.id = 0;
        	member_model.name = "散客";
        }
        if(!member_model.avatarId){
            member_model.avatarPath = "assets/images/default_female.png";
        }
        if(!member_model.gender){
            member_model.gender = GenderType.female;
        }
        
        return member_model;
    }
}
