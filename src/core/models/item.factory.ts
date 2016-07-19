import { ItemBaseModel } from './item-base.model';
import { ProductModel } from './product.model';
import { ServiceItemModel } from './service-item.model';

export class ItemFactory{
	static serializerItem(model :any){
		let item : ItemBaseModel;
		switch(model.itemType){
			case "PRODUCT":
				item = ProductModel.serializer(model);
				break;
			default:
			case "SERVICE_ITEM":
				item = ServiceItemModel.serializer(model);
				break;
		}
		return item;
	}
}