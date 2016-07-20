import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model'; 

export class ItemBaseModel extends BaseModel{
	name:string;
	price:number;
	employeeList:EmployeeModel[];
	constructor(id?:number){
		super(id);
	}

	serializer(model:any){
		super.serializer(model.id);
		this.name = model.itemName;
		this.price = model.sellingPrice;
		if(model.orderEmployees && model.orderEmployees.length > 0){
			this.employeeList = [];
			for(let i in model.orderEmployees){
				let employee = new EmployeeModel();
				employee.serializer(model.orderEmployees[i]);
				this.employeeList.push(employee);
			}
		}
	}
}