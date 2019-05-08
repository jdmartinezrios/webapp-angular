import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    ManufacturedProductTypeService,
    ManufacturedProductTypePopupService,
    ManufacturedProductTypeComponent,
    ManufacturedProductTypeDetailComponent,
    ManufacturedProductTypeDialogComponent,
    ManufacturedProductTypePopupComponent,
    ManufacturedProductTypeDeletePopupComponent,
    ManufacturedProductTypeDeleteDialogComponent,
    manufacturedProductTypeRoute,
    manufacturedProductTypePopupRoute,
    ManufacturedProductTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...manufacturedProductTypeRoute,
    ...manufacturedProductTypePopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ManufacturedProductTypeComponent,
        ManufacturedProductTypeDetailComponent,
        ManufacturedProductTypeDialogComponent,
        ManufacturedProductTypeDeleteDialogComponent,
        ManufacturedProductTypePopupComponent,
        ManufacturedProductTypeDeletePopupComponent,
    ],
    entryComponents: [
        ManufacturedProductTypeComponent,
        ManufacturedProductTypeDialogComponent,
        ManufacturedProductTypePopupComponent,
        ManufacturedProductTypeDeleteDialogComponent,
        ManufacturedProductTypeDeletePopupComponent,
    ],
    providers: [
        ManufacturedProductTypeService,
        ManufacturedProductTypePopupService,
        ManufacturedProductTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoManufacturedProductTypeModule {}
