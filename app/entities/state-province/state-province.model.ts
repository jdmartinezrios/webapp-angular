import { BaseEntity } from './../../shared';

export class StateProvince implements BaseEntity {
    constructor(
        public id?: number,
        public stateName?: string,
        public countryCountryName?: string,
        public countryId?: number,
    ) {
    }
}
