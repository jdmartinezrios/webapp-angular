import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    StateProvinceService,
    StateProvincePopupService,
    StateProvinceComponent,
    StateProvinceDetailComponent,
    StateProvinceDialogComponent,
    StateProvincePopupComponent,
    StateProvinceDeletePopupComponent,
    StateProvinceDeleteDialogComponent,
    stateProvinceRoute,
    stateProvincePopupRoute,
    StateProvinceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stateProvinceRoute,
    ...stateProvincePopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StateProvinceComponent,
        StateProvinceDetailComponent,
        StateProvinceDialogComponent,
        StateProvinceDeleteDialogComponent,
        StateProvincePopupComponent,
        StateProvinceDeletePopupComponent,
    ],
    entryComponents: [
        StateProvinceComponent,
        StateProvinceDialogComponent,
        StateProvincePopupComponent,
        StateProvinceDeleteDialogComponent,
        StateProvinceDeletePopupComponent,
    ],
    providers: [
        StateProvinceService,
        StateProvincePopupService,
        StateProvinceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoStateProvinceModule {}
