import { BaseEntity } from './../../shared';

export class ProductType implements BaseEntity {
    constructor(
        public id?: number,
        public productTypeName?: string,
        public productTypeEnabled?: boolean,
        public categoryProductCategoryName?: string,
        public categoryId?: number,
    ) {
        this.productTypeEnabled = false;
    }
}
