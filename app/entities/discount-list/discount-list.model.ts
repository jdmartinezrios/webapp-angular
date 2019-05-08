import { BaseEntity } from './../../shared';

export class DiscountList implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public discount?: number,
        public productName?: string,
        public productId?: number,
    ) {
    }
}
