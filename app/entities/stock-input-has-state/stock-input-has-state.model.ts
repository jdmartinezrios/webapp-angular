import { BaseEntity } from './../../shared';

export const enum StockState {
    'IN_TRANSIT',
    'IN_SITE'
}

export class StockInputHasState implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public observations?: string,
        public stockState?: StockState,
        public stockInputId?: number,
    ) {
    }
}
