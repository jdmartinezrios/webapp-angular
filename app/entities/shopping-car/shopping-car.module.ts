import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import { DelcampoAdminModule } from '../../admin/admin.module';
import {
    ShoppingCarService,
    ShoppingCarPopupService,
    ShoppingCarComponent,
    ShoppingCarDetailComponent,
    ShoppingCarDialogComponent,
    ShoppingCarPopupComponent,
    ShoppingCarDeletePopupComponent,
    ShoppingCarDeleteDialogComponent,
    shoppingCarRoute,
    shoppingCarPopupRoute,
    ShoppingCarResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...shoppingCarRoute,
    ...shoppingCarPopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        DelcampoAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShoppingCarComponent,
        ShoppingCarDetailComponent,
        ShoppingCarDialogComponent,
        ShoppingCarDeleteDialogComponent,
        ShoppingCarPopupComponent,
        ShoppingCarDeletePopupComponent,
    ],
    entryComponents: [
        ShoppingCarComponent,
        ShoppingCarDialogComponent,
        ShoppingCarPopupComponent,
        ShoppingCarDeleteDialogComponent,
        ShoppingCarDeletePopupComponent,
    ],
    providers: [
        ShoppingCarService,
        ShoppingCarPopupService,
        ShoppingCarResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoShoppingCarModule {}
