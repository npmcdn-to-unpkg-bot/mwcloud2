import { MoneyService } from '../services/money.service';
import { IPaginationInstance } from 'ng2-pagination';

export class BaseModel {
   id: number;
    constructor(id?:number) {
    	this.id = id;
    }
    public point2yuan(value:any){
    	return MoneyService.point2yuan(value);
    }
    public yuan2point(value:any){
    	return MoneyService.yuan2point(value);
    }
}
export class BaseComponent{

}

export class BasePageComponent extends BaseComponent {
  paginationConfig:IPaginationInstance = {
        //id: 'custom',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems:0
    };
}
