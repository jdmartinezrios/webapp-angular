import { BaseEntity } from './../../shared';

export class ManufacturedProductType implements BaseEntity {
    constructor(
        public id?: number,
        public manufacturedProductTypeName?: string,
        public manufacturedProductEnabled?: boolean,
    ) {
        this.manufacturedProductEnabled = false;
    }
}
