import { BaseEntity } from './../../shared';

export const enum Currency {
    'COP',
    'USD',
    'EUR'
}

export class PriceList implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public price?: number,
        public currency?: Currency,
        public productName?: string,
        public productId?: number,
    ) {
    }
}
