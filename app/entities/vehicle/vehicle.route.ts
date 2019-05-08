import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VehicleComponent } from './vehicle.component';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { VehiclePopupComponent } from './vehicle-dialog.component';
import { VehicleDeletePopupComponent } from './vehicle-delete-dialog.component';

@Injectable()
export class VehicleResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const vehicleRoute: Routes = [
    {
        path: 'vehicle',
        component: VehicleComponent,
        resolve: {
            'pagingParams': VehicleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vehicle/:id',
        component: VehicleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehiclePopupRoute: Routes = [
    {
        path: 'vehicle-new',
        component: VehiclePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle/:id/edit',
        component: VehiclePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle/:id/delete',
        component: VehicleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
