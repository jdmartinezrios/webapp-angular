import { BaseEntity } from './../../shared';

export class Vehicle implements BaseEntity {
    constructor(
        public id?: number,
        public referenceVehicle?: string,
        public brand?: string,
        public licensePlate?: string,
    ) {
    }
}
