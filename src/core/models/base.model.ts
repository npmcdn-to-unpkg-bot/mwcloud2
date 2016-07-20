import { MoneyService } from '../services/money.service';

export class BaseModel {
   id: number;
    constructor(id?:number) {
    	this.id = id;
    }
    serializer(id:number){
        this.id = id;
    }
    public point2yuan(value:any){
    	return MoneyService.point2yuan(value);
    }
    public yuan2point(value:any){
    	return MoneyService.yuan2point(value);
    }
}

