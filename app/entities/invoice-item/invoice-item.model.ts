import { BaseEntity } from './../../shared';

export class InvoiceItem implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public unitPrice?: number,
        public discount?: number,
        public invoiceId?: number,
        public productName?: string,
        public productId?: number,
    ) {
    }
}
