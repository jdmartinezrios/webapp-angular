import { BaseEntity } from './../../shared';

export const enum MeasurementUnit {
    'LB',
    'KG',
    'UNIT'
}

export class RecipeItem implements BaseEntity {
    constructor(
        public id?: number,
        public productNameText?: string,
        public quantity?: number,
        public measurementUnit?: MeasurementUnit,
        public productName?: string,
        public productId?: number,
    ) {
    }
}
