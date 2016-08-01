import { ItemBaseModel } from './item-base.model';
import { ProductModel } from './product.model';
import { ServiceItemModel } from './service-item.model';

export class ItemFactory{
	static serializerItem(model :any){
		// if(!model.itemType){
		// 	model.itemType = model.type;
		// }
		let item : ItemBaseModel;
		switch(model.itemType || model.type){
			case "PRODUCT":
				item = new ProductModel();
				item.serializer(model);
				break;
			default:
			case "SERVICE_ITEM":
				item = new ServiceItemModel().serializer(model);
				break;
		}
		return item;
	}
}