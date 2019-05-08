import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    YoutubeVideoService,
    YoutubeVideoPopupService,
    YoutubeVideoComponent,
    YoutubeVideoDetailComponent,
    YoutubeVideoDialogComponent,
    YoutubeVideoPopupComponent,
    YoutubeVideoDeletePopupComponent,
    YoutubeVideoDeleteDialogComponent,
    youtubeVideoRoute,
    youtubeVideoPopupRoute,
    YoutubeVideoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...youtubeVideoRoute,
    ...youtubeVideoPopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        YoutubeVideoComponent,
        YoutubeVideoDetailComponent,
        YoutubeVideoDialogComponent,
        YoutubeVideoDeleteDialogComponent,
        YoutubeVideoPopupComponent,
        YoutubeVideoDeletePopupComponent,
    ],
    entryComponents: [
        YoutubeVideoComponent,
        YoutubeVideoDialogComponent,
        YoutubeVideoPopupComponent,
        YoutubeVideoDeleteDialogComponent,
        YoutubeVideoDeletePopupComponent,
    ],
    providers: [
        YoutubeVideoService,
        YoutubeVideoPopupService,
        YoutubeVideoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoYoutubeVideoModule {}
