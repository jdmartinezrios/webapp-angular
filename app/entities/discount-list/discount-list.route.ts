import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DiscountListComponent } from './discount-list.component';
import { DiscountListDetailComponent } from './discount-list-detail.component';
import { DiscountListPopupComponent } from './discount-list-dialog.component';
import { DiscountListDeletePopupComponent } from './discount-list-delete-dialog.component';

@Injectable()
export class DiscountListResolvePagingParams implements Resolve<any> {

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

export const discountListRoute: Routes = [
    {
        path: 'discount-list',
        component: DiscountListComponent,
        resolve: {
            'pagingParams': DiscountListResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.discountList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'discount-list/:id',
        component: DiscountListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.discountList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discountListPopupRoute: Routes = [
    {
        path: 'discount-list-new',
        component: DiscountListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.discountList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discount-list/:id/edit',
        component: DiscountListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.discountList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discount-list/:id/delete',
        component: DiscountListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.discountList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
