import { BaseEntity } from './../../shared';

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public latitude?: number,
        public longitude?: number,
        public invoices?: BaseEntity[],
        public zoneZoneName?: string,
        public zoneId?: number,
    ) {
    }
}
