import { BaseModel } from './base.model';
import { MemberModel } from './member.model';
import { OrderType,OrderSource,OrderStatus } from '../enums/order.enum';
import { ItemBaseModel } from './item-base.model';
import { ItemFactory } from './item.factory';

export class StoreModel extends BaseModel {
    name:string;
    text:string;
    fullName:string;
    storeNo:string;
    openStartTime:string;
    openEndTime:string;
    appointStartTime:string;
    appointEndTime:string;

    constructor(id?: number){
        super(id);
    }

    serializer(model:any){
        super.serializer(model.id);
        this.name = model.name;
        this.text = model.name;
        this.openStartTime = model.openTimeStart;
        this.openEndTime = model.openTimeEnd;
        this.appointStartTime = model.appoinmentTimeStart;
        this.appointEndTime = model.appoinmentTimeEnd;
        return this;
    } 

}
