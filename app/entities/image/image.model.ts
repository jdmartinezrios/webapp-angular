import { BaseEntity } from './../../shared';

export class Image implements BaseEntity {
    constructor(
        public id?: number,
        public imageName?: string,
        public imageContentType?: string,
        public image?: any,
        public productId?: number,
        public recipeId?: number,
    ) {
    }
}
