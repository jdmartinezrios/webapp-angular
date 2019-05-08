import { BaseEntity } from './../../shared';

export class Invoice implements BaseEntity {
    constructor(
        public id?: number,
        public invoiceDate?: any,
        public invoiceNumber?: string,
        public payed?: boolean,
        public paymentDate?: any,
        public surcharge?: boolean,
        public total?: number,
        public invoiceStates?: BaseEntity[],
        public invoiceItems?: BaseEntity[],
        public customerId?: number,
        public locationId?: number,
    ) {
        this.payed = false;
        this.surcharge = false;
    }
}
