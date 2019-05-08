import { BaseEntity } from './../../shared';

export class Zone implements BaseEntity {
    constructor(
        public id?: number,
        public zoneName?: string,
        public zoneEnabled?: boolean,
        public cityCityName?: string,
        public cityId?: number,
    ) {
        this.zoneEnabled = false;
    }
}
