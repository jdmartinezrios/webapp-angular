import { BaseEntity } from './../../shared';

export class ProductCategory implements BaseEntity {
    constructor(
        public id?: number,
        public productCategoryName?: string,
        public productCategoryEnabled?: boolean,
    ) {
        this.productCategoryEnabled = false;
    }
}
