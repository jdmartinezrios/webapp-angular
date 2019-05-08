import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    StockInputHasStateService,
    StockInputHasStatePopupService,
    StockInputHasStateComponent,
    StockInputHasStateDetailComponent,
    StockInputHasStateDialogComponent,
    StockInputHasStatePopupComponent,
    StockInputHasStateDeletePopupComponent,
    StockInputHasStateDeleteDialogComponent,
    stockInputHasStateRoute,
    stockInputHasStatePopupRoute,
    StockInputHasStateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stockInputHasStateRoute,
    ...stockInputHasStatePopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StockInputHasStateComponent,
        StockInputHasStateDetailComponent,
        StockInputHasStateDialogComponent,
        StockInputHasStateDeleteDialogComponent,
        StockInputHasStatePopupComponent,
        StockInputHasStateDeletePopupComponent,
    ],
    entryComponents: [
        StockInputHasStateComponent,
        StockInputHasStateDialogComponent,
        StockInputHasStatePopupComponent,
        StockInputHasStateDeleteDialogComponent,
        StockInputHasStateDeletePopupComponent,
    ],
    providers: [
        StockInputHasStateService,
        StockInputHasStatePopupService,
        StockInputHasStateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoStockInputHasStateModule {}
