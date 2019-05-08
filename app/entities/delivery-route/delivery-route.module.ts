import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DelcampoSharedModule } from '../../shared';
import { DelcampoAdminModule } from '../../admin/admin.module';
import {
    DeliveryRouteService,
    DeliveryRoutePopupService,
    DeliveryRouteComponent,
    DeliveryRouteDetailComponent,
    DeliveryRouteDialogComponent,
    DeliveryRoutePopupComponent,
    DeliveryRouteDeletePopupComponent,
    DeliveryRouteDeleteDialogComponent,
    deliveryRouteRoute,
    deliveryRoutePopupRoute,
    DeliveryRouteResolvePagingParams,
    ManagmentRoutesComponent
} from './';
import {AutoCompleteModule} from 'primeng/components/autocomplete/autocomplete';

const ENTITY_STATES = [
    ...deliveryRouteRoute,
    ...deliveryRoutePopupRoute,
];

@NgModule({
    imports: [
        DelcampoSharedModule,
        DelcampoAdminModule,
        AutoCompleteModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeliveryRouteComponent,
        DeliveryRouteDetailComponent,
        DeliveryRouteDialogComponent,
        DeliveryRouteDeleteDialogComponent,
        DeliveryRoutePopupComponent,
        DeliveryRouteDeletePopupComponent,
        ManagmentRoutesComponent
    ],
    entryComponents: [
        DeliveryRouteComponent,
        DeliveryRouteDialogComponent,
        DeliveryRoutePopupComponent,
        DeliveryRouteDeleteDialogComponent,
        DeliveryRouteDeletePopupComponent,
        ManagmentRoutesComponent
    ],
    providers: [
        DeliveryRouteService,
        DeliveryRoutePopupService,
        DeliveryRouteResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DelcampoDeliveryRouteModule {}
