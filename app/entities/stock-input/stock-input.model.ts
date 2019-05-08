import { BaseEntity } from './../../shared';

export const enum StockState {
    'IN_TRANSIT',
    'IN_SITE'
}

export class StockInput implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public quantity?: number,
        public stockState?: StockState,
        public stockInputs?: BaseEntity[],
        public productName?: string,
        public productId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
    }
}
