import { BaseModel } from './base.model';

export class EmployeeModel extends BaseModel{
	name:string;
	constructor(id?:number,name?:string){
		super(id);
		this.name = name;
	}

	serializer(model:any){
		super.serializer(model.id);
		this.name = model.employeeName;
		return this;
	}
}