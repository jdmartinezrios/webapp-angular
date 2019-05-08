import { BaseEntity } from './../../shared';

export class ShoppingCar implements BaseEntity {
    constructor(
        public id?: number,
        public addDate?: any,
        public quantity?: number,
        public productName?: string,
        public productId?: number,
        public userLogin?: string,
        public userId?: number,
    ) {
    }
}
