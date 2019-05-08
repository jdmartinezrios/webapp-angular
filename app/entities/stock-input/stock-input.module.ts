import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import { DelcampoAdminModule } from '../../admin/admin.module';
import {
    StockInputService,
    StockInputPopupService,
    StockInputComponent,
    StockInputDetailComponent,
    StockInputDialogComponent,
    StockInputPopupComponent,
    StockInputDeletePopupComponent,
    StockInputDeleteDialogComponent,
    stockInputRoute,
    stockInputPopupRoute,
    StockInputResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stockInputRoute,
    ...stockInputPopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        DelcampoAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StockInputComponent,
        StockInputDetailComponent,
        StockInputDialogComponent,
        StockInputDeleteDialogComponent,
        StockInputPopupComponent,
        StockInputDeletePopupComponent,
    ],
    entryComponents: [
        StockInputComponent,
        StockInputDialogComponent,
        StockInputPopupComponent,
        StockInputDeleteDialogComponent,
        StockInputDeletePopupComponent,
    ],
    providers: [
        StockInputService,
        StockInputPopupService,
        StockInputResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoStockInputModule {}
