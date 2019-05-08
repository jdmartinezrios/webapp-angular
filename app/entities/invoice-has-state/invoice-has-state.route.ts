import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceHasStateComponent } from './invoice-has-state.component';
import { InvoiceHasStateDetailComponent } from './invoice-has-state-detail.component';
import { InvoiceHasStatePopupComponent } from './invoice-has-state-dialog.component';
import { InvoiceHasStateDeletePopupComponent } from './invoice-has-state-delete-dialog.component';

@Injectable()
export class InvoiceHasStateResolvePagingParams implements Resolve<any> {

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

export const invoiceHasStateRoute: Routes = [
    {
        path: 'invoice-has-state',
        component: InvoiceHasStateComponent,
        resolve: {
            'pagingParams': InvoiceHasStateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceHasState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-has-state/:id',
        component: InvoiceHasStateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceHasState.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceHasStatePopupRoute: Routes = [
    {
        path: 'invoice-has-state-new',
        component: InvoiceHasStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceHasState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-has-state/:id/edit',
        component: InvoiceHasStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceHasState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-has-state/:id/delete',
        component: InvoiceHasStateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceHasState.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
