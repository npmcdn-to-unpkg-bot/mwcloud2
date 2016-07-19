import { BaseModel } from './base.model';

export class EmployeeModel extends BaseModel{
	name:string;
	constructor(id?:number){
		super(id);
	}

	static serializer(model:any):EmployeeModel{
		let employee:EmployeeModel = new EmployeeModel(model.id);
		employee.name = model.employeeName;
		return employee;
	}
}