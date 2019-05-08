import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    DiscountListService,
    DiscountListPopupService,
    DiscountListComponent,
    DiscountListDetailComponent,
    DiscountListDialogComponent,
    DiscountListPopupComponent,
    DiscountListDeletePopupComponent,
    DiscountListDeleteDialogComponent,
    discountListRoute,
    discountListPopupRoute,
    DiscountListResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...discountListRoute,
    ...discountListPopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiscountListComponent,
        DiscountListDetailComponent,
        DiscountListDialogComponent,
        DiscountListDeleteDialogComponent,
        DiscountListPopupComponent,
        DiscountListDeletePopupComponent,
    ],
    entryComponents: [
        DiscountListComponent,
        DiscountListDialogComponent,
        DiscountListPopupComponent,
        DiscountListDeleteDialogComponent,
        DiscountListDeletePopupComponent,
    ],
    providers: [
        DiscountListService,
        DiscountListPopupService,
        DiscountListResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoDiscountListModule {}
