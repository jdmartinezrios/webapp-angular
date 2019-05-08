import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DeliveryRouteComponent } from './delivery-route.component';
import { DeliveryRouteDetailComponent } from './delivery-route-detail.component';
import { DeliveryRoutePopupComponent } from './delivery-route-dialog.component';
import { DeliveryRouteDeletePopupComponent } from './delivery-route-delete-dialog.component';
import { ManagmentRoutesComponent } from './managment-routes.component';
import { DashboardComponent } from '../../layouts';

@Injectable()
export class DeliveryRouteResolvePagingParams implements Resolve<any> {

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

export const deliveryRouteRoute: Routes = [
    {
    path: 'delivery-route',
    component: DashboardComponent,
    children: [
        {
        path: '',
        component: DeliveryRouteComponent,
        resolve: {
            'pagingParams': DeliveryRouteResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.deliveryRoute.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'delivery-route/:id',
        component: DeliveryRouteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.deliveryRoute.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'managment-routes',
        component: ManagmentRoutesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.deliveryRoute.home.title'
        }
    }
    ]
    }
];

export const deliveryRoutePopupRoute: Routes = [
    {
        path: 'delivery-route-new',
        component: DeliveryRoutePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.deliveryRoute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delivery-route/:id/edit',
        component: DeliveryRoutePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.deliveryRoute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delivery-route/:id/delete',
        component: DeliveryRouteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.deliveryRoute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
