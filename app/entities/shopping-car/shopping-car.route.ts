import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ShoppingCarComponent } from './shopping-car.component';
import { ShoppingCarDetailComponent } from './shopping-car-detail.component';
import { ShoppingCarPopupComponent } from './shopping-car-dialog.component';
import { ShoppingCarDeletePopupComponent } from './shopping-car-delete-dialog.component';

@Injectable()
export class ShoppingCarResolvePagingParams implements Resolve<any> {

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

export const shoppingCarRoute: Routes = [
    {
        path: 'shopping-car',
        component: ShoppingCarComponent,
        resolve: {
            'pagingParams': ShoppingCarResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.shoppingCar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'shopping-car/:id',
        component: ShoppingCarDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.shoppingCar.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const shoppingCarPopupRoute: Routes = [
    {
        path: 'shopping-car-new',
        component: ShoppingCarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.shoppingCar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shopping-car/:id/edit',
        component: ShoppingCarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.shoppingCar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'shopping-car/:id/delete',
        component: ShoppingCarDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.shoppingCar.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
