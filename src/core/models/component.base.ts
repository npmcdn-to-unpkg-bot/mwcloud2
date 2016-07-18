import { IPaginationInstance } from 'ng2-pagination';

export class BaseComponent{

}

export class PageBaseComponent extends BaseComponent {
  paginationConfig:IPaginationInstance = {
        //id: 'custom',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems:0
    };
}