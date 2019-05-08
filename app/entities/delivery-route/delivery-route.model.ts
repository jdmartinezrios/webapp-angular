import { BaseEntity } from './../../shared';

export class DeliveryRoute implements BaseEntity {
    constructor(
        public id?: number,
        public createDate?: any,
        public scheduleDate?: any,
        public vehicleReferenceVehicle?: string,
        public vehicleId?: number,
        public driverLogin?: string,
        public driverId?: number,
        public shipments?: BaseEntity[],
    ) {
    }
}
