import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StockInputComponent } from './stock-input.component';
import { StockInputDetailComponent } from './stock-input-detail.component';
import { StockInputPopupComponent } from './stock-input-dialog.component';
import { StockInputDeletePopupComponent } from './stock-input-delete-dialog.component';

@Injectable()
export class StockInputResolvePagingParams implements Resolve<any> {

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

export const stockInputRoute: Routes = [
    {
        path: 'stock-input',
        component: StockInputComponent,
        resolve: {
            'pagingParams': StockInputResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInput.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'stock-input/:id',
        component: StockInputDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInput.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stockInputPopupRoute: Routes = [
    {
        path: 'stock-input-new',
        component: StockInputPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInput.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-input/:id/edit',
        component: StockInputPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInput.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'stock-input/:id/delete',
        component: StockInputDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stockInput.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
