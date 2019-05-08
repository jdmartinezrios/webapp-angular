import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PriceListComponent } from './price-list.component';
import { PriceListDetailComponent } from './price-list-detail.component';
import { PriceListPopupComponent } from './price-list-dialog.component';
import { PriceListDeletePopupComponent } from './price-list-delete-dialog.component';

@Injectable()
export class PriceListResolvePagingParams implements Resolve<any> {

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

export const priceListRoute: Routes = [
    {
        path: 'price-list',
        component: PriceListComponent,
        resolve: {
            'pagingParams': PriceListResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.priceList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'price-list/:id',
        component: PriceListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.priceList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const priceListPopupRoute: Routes = [
    {
        path: 'price-list-new',
        component: PriceListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.priceList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-list/:id/edit',
        component: PriceListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.priceList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'price-list/:id/delete',
        component: PriceListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.priceList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
