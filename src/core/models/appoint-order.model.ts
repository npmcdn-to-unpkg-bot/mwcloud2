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
    startTime:Date;
    endTime:Date;
    constructor(id?: number){
        super(id);
    }

    serializer(model:any){
        super.serializer(model.holderTypeId);
        this.orderNo = model.flowNumber;
        //this.orderDate = model.orderDate;
        //this.source = +model.source;
        //this.status = +model.status;
        this.startTime = new Date(model.startTime);
        this.endTime = new Date(model.endTime);
        model.simpleMemberVo = {
            id:model.memberId,
            name:model.name,
            mobile:model.phone,
            type:model.memberType
        };
        this.member = new MemberModel().serializer(model.simpleMemberVo);
        if(model.items && model.items.length > 0){
            this.itemList = [];
            for(let i in model.items){
                this.itemList.push(ItemFactory.serializerItem(model.items[i]));
            }
        }
        return this;
    }
}

export class AppointOrderTableModel extends AppointOrderModel {
    constructor(id?: number){
        super(id);
    }

    getMarginTop(dayStartHour:number,hourPX:number){
        return (this.startTime.getHours()-dayStartHour)*hourPX + this.startTime.getMinutes();
    }
    getHeight(hourPX:number){
        if(this.startTime > this.endTime){
            this.endTime.setDate(this.endTime.getDate()+1);
        }
        if(this.endTime.getDate()>this.startTime.getDate()){
            //over one day
            return 1;
        }
        let diffHours:number = this.endTime.getHours() - this.startTime.getHours()
        if(diffHours < 0){
            diffHours += 24;
        }
        return diffHours * hourPX  + (this.endTime.getMinutes() - this.startTime.getMinutes());
    }

    serializer(model:any){
        super.serializer(model);
        return this;
    } 

}
