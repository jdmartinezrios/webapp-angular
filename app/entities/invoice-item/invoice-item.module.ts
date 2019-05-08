import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import {
    InvoiceItemService,
    InvoiceItemPopupService,
    InvoiceItemComponent,
    InvoiceItemDetailComponent,
    InvoiceItemDialogComponent,
    InvoiceItemPopupComponent,
    InvoiceItemDeletePopupComponent,
    InvoiceItemDeleteDialogComponent,
    invoiceItemRoute,
    invoiceItemPopupRoute,
    InvoiceItemResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...invoiceItemRoute,
    ...invoiceItemPopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InvoiceItemComponent,
        InvoiceItemDetailComponent,
        InvoiceItemDialogComponent,
        InvoiceItemDeleteDialogComponent,
        InvoiceItemPopupComponent,
        InvoiceItemDeletePopupComponent,
    ],
    entryComponents: [
        InvoiceItemComponent,
        InvoiceItemDialogComponent,
        InvoiceItemPopupComponent,
        InvoiceItemDeleteDialogComponent,
        InvoiceItemDeletePopupComponent,
    ],
    providers: [
        InvoiceItemService,
        InvoiceItemPopupService,
        InvoiceItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoInvoiceItemModule {}
