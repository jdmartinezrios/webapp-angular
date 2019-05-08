import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    ZoneService,
    ZonePopupService,
    ZoneComponent,
    ZoneDetailComponent,
    ZoneDialogComponent,
    ZonePopupComponent,
    ZoneDeletePopupComponent,
    ZoneDeleteDialogComponent,
    zoneRoute,
    zonePopupRoute,
    ZoneResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...zoneRoute,
    ...zonePopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ZoneComponent,
        ZoneDetailComponent,
        ZoneDialogComponent,
        ZoneDeleteDialogComponent,
        ZonePopupComponent,
        ZoneDeletePopupComponent,
    ],
    entryComponents: [
        ZoneComponent,
        ZoneDialogComponent,
        ZonePopupComponent,
        ZoneDeleteDialogComponent,
        ZoneDeletePopupComponent,
    ],
    providers: [
        ZoneService,
        ZonePopupService,
        ZoneResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoZoneModule {}
