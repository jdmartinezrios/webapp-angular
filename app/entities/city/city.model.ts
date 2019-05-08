import { BaseEntity } from './../../shared';

export class City implements BaseEntity {
    constructor(
        public id?: number,
        public cityName?: string,
        public stateProvinceStateName?: string,
        public stateProvinceId?: number,
    ) {
    }
}
