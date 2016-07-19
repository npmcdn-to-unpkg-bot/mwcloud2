import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model'; 

export class ItemBaseModel extends BaseModel{
	name:string;
	price:number;
	employeeList:EmployeeModel[];
	constructor(id?:number){
		super(id);
	}

	static serializer(item:ItemBaseModel,model:any){
		item.name = model.itemName;
		item.price = model.sellingPrice;
		if(model.orderEmployees && model.orderEmployees.length > 0){
			item.employeeList = [];
			for(let i in model.orderEmployees){
				item.employeeList.push(EmployeeModel.serializer(model.orderEmployees[i]));
			}
		}
		
	}
}