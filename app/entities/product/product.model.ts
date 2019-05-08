import { BaseEntity } from './../../shared';

export const enum MeasurementUnit {
    'LB',
    'KG',
    'UNIT'
}

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: any,
        public measurementUnit?: MeasurementUnit,
        public stock?: number,
        public images?: BaseEntity[],
        public baseName?: string,
        public baseId?: number,
        public typeProductTypeName?: string,
        public typeId?: number,
        public categoryProductCategoryName?: string,
        public categoryId?: number,
        public manufacturedTypeManufacturedProductTypeName?: string,
        public manufacturedTypeId?: number,
        public youtubes?: BaseEntity[],
    ) {
    }
}
