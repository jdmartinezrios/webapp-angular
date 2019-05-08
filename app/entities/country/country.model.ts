import { BaseEntity } from './../../shared';

export class Country implements BaseEntity {
    constructor(
        public id?: number,
        public countryCode?: string,
        public countryName?: string,
    ) {
    }
}
