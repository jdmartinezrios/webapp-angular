import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    PriceListService,
    PriceListPopupService,
    PriceListComponent,
    PriceListDetailComponent,
    PriceListDialogComponent,
    PriceListPopupComponent,
    PriceListDeletePopupComponent,
    PriceListDeleteDialogComponent,
    priceListRoute,
    priceListPopupRoute,
    PriceListResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...priceListRoute,
    ...priceListPopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PriceListComponent,
        PriceListDetailComponent,
        PriceListDialogComponent,
        PriceListDeleteDialogComponent,
        PriceListPopupComponent,
        PriceListDeletePopupComponent,
    ],
    entryComponents: [
        PriceListComponent,
        PriceListDialogComponent,
        PriceListPopupComponent,
        PriceListDeleteDialogComponent,
        PriceListDeletePopupComponent,
    ],
    providers: [
        PriceListService,
        PriceListPopupService,
        PriceListResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoPriceListModule {}
