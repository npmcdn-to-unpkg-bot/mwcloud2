import { ItemBaseModel } from './item-base.model';

export class ProductModel extends ItemBaseModel{
	constructor(id?:number){
		super(id);
	}

	static serializer(model:any):ProductModel{
		let product:ProductModel = new ProductModel(model.id);
		ItemBaseModel.serializer(product,model);
		return product;
	}
}