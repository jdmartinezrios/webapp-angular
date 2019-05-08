import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StockInputHasStateComponent } from './stock-input-has-state.component';
import { StockInputHasStateDetailComponent } from './stock-input-has-state-detail.component';
import { StockInputHasStatePopupComponent } from './stock-input-has-state-dialog.component';
import { StockInputHasStateDeletePopupComponent } from './stock-input-has-state-delete-dialog.component';

@Injectable()
export class StockInputHasStateResolvePagingParams implements Resolve<any> {

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

export const stockInputHasStateRoute: Routes = [
    {
        path: 'stock-input-has-state',
        component: StockInputHasStateComponent,
        resolve: {
            'pagingParams': StockInputHasStateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInputHasState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stock-input-has-state/:id',
        component: StockInputHasStateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInputHasState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockInputHasStatePopupRoute: Routes = [
    {
        path: 'stock-input-has-state-new',
        component: StockInputHasStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInputHasState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-input-has-state/:id/edit',
        component: StockInputHasStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInputHasState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-input-has-state/:id/delete',
        component: StockInputHasStateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInputHasState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
