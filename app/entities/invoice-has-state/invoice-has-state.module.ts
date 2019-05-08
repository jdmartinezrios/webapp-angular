import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import { DelcampoAdminModule } from '../../admin/admin.module';
import {
    InvoiceHasStateService,
    InvoiceHasStatePopupService,
    InvoiceHasStateComponent,
    InvoiceHasStateDetailComponent,
    InvoiceHasStateDialogComponent,
    InvoiceHasStatePopupComponent,
    InvoiceHasStateDeletePopupComponent,
    InvoiceHasStateDeleteDialogComponent,
    invoiceHasStateRoute,
    invoiceHasStatePopupRoute,
    InvoiceHasStateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceHasStateRoute,
    ...invoiceHasStatePopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        DelcampoAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceHasStateComponent,
        InvoiceHasStateDetailComponent,
        InvoiceHasStateDialogComponent,
        InvoiceHasStateDeleteDialogComponent,
        InvoiceHasStatePopupComponent,
        InvoiceHasStateDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceHasStateComponent,
        InvoiceHasStateDialogComponent,
        InvoiceHasStatePopupComponent,
        InvoiceHasStateDeleteDialogComponent,
        InvoiceHasStateDeletePopupComponent,
    ],
    providers: [
        InvoiceHasStateService,
        InvoiceHasStatePopupService,
        InvoiceHasStateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoInvoiceHasStateModule {}
