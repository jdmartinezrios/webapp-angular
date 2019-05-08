import { BaseEntity } from './../../shared';

export class YoutubeVideo implements BaseEntity {
    constructor(
        public id?: number,
        public youtubeName?: string,
        public youtubeUrl?: string,
        public products?: BaseEntity[],
        public recipes?: BaseEntity[],
    ) {
    }
}
