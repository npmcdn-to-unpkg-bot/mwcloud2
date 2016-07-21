import { BaseModel } from './base.model';
import { MemberModel } from './member.model';
import { OrderType,OrderSource,OrderStatus } from '../enums/order.enum';
import { ItemBaseModel } from './item-base.model';
import { ItemFactory } from './item.factory';

export class AppointOrderModel extends BaseModel {
    orderNo: string;
    remark:string;
    orderDate:string;
    source:OrderSource;
    status:OrderStatus;
    member: MemberModel;
    itemList:ItemBaseModel[];
    constructor(id?: number){
        super(id);
    }

    serializer(model:any){
        super.serializer(model.id);
        this.orderNo = model.orderNo;
        this.orderDate = model.orderDate;
        this.source = +model.source;
        this.status = +model.status;
        model.simpleMemberVo.id = model.memberId;//???
        model.simpleMemberVo.name = model.memberName;
        model.simpleMemberVo.mobile = model.memberMobile;
        model.simpleMemberVo.memberNo = model.memberNo;
        this.member = new MemberModel().serializer(model.simpleMemberVo);
        if(model.orderItems && model.orderItems.length > 0){
            this.itemList = [];
            for(let i in model.orderItems){
                this.itemList.push(ItemFactory.serializerItem(model.orderItems[i]));
            }
        }
        return this;
    } 

}
