import { BaseModel } from './base.model'

export class MemberModel extends BaseModel {
    member_no: string;
    name: string;
    mobile: string;
    avatar_id:number;
    //constructor(id: number);
    constructor(id?: number, member_no?: string, name?: string, mobile?: string) {
        super(id);
        if (id) {
            this.member_no = member_no;
            this.name = name;
            this.mobile = mobile;
        }else{
        	this.member_no = "0";
            this.name = "散客";
            this.mobile = "";
        }
    }

    static serializer(model:any,member_id:number):MemberModel{
        if(!model){
            return null;
        }
        let member_model : MemberModel = new MemberModel();
        if(model.id || member_id){
        	member_model.id = model.id?model.id:member_id;
        	member_model.avatar_id = model.avatarId;
        	member_model.member_no = model.memberNo;
        	member_model.name = model.name;
        	member_model.mobile = model.mobile;
        }else{
        	//散客
        	member_model.id = 0;
        	member_model.name = "散客";
        }
        
        return member_model;
    }
}
