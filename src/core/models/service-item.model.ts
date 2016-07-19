import { ItemBaseModel } from './item-base.model';

export class ServiceItemModel extends ItemBaseModel{
	constructor(id?:number){
		super(id);
	}

	static serializer(model:any):ServiceItemModel{
		let serviceItem:ServiceItemModel = new ServiceItemModel(model.id);
		//serviceItem.name = model.itemName;
		ItemBaseModel.serializer(serviceItem,model);
		return serviceItem;
	}
}