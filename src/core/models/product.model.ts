import { ItemBaseModel } from './item-base.model';

export class ProductModel extends ItemBaseModel{
	constructor(id?:number){
		super(id);
	}

	serializer(model:any){
		super.serializer(model);
		return this;
	}
}