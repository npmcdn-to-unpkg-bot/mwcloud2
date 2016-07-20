import { BaseModel } from './base.model';

export class EmployeeModel extends BaseModel{
	name:string;
	constructor(id?:number){
		super(id);
	}

	serializer(model:any){
		super.serializer(model);
		this.name = model.employeeName;
		return this;
	}
}