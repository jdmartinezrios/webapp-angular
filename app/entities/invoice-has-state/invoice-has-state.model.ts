import { BaseEntity } from './../../shared';

export const enum InvoiceState {
    'NO_PAID',
    'PAID',
    'SCHEDULED',
    'PACKED',
    'IN_TRANSIT',
    'DELIVERED',
    'REPROGRAMED'
}

export class InvoiceHasState implements BaseEntity {
    constructor(
        public id?: number,
        public registerDate?: any,
        public observations?: string,
        public invoiceState?: InvoiceState,
        public userLogin?: string,
        public userId?: number,
        public invoiceId?: number,
    ) {
    }
}
