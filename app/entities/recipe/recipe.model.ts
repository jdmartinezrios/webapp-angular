import { BaseEntity } from './../../shared';

export class Recipe implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public personsQuantity?: number,
        public description?: any,
        public recipeEnabled?: boolean,
        public images?: BaseEntity[],
        public itemId?: number,
        public youtubes?: BaseEntity[],
    ) {
        this.recipeEnabled = false;
    }
}
