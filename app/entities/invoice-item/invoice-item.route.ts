import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { InvoiceItemComponent } from './invoice-item.component';
import { InvoiceItemDetailComponent } from './invoice-item-detail.component';
import { InvoiceItemPopupComponent } from './invoice-item-dialog.component';
import { InvoiceItemDeletePopupComponent } from './invoice-item-delete-dialog.component';

@Injectable()
export class InvoiceItemResolvePagingParams implements Resolve<any> {

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

export const invoiceItemRoute: Routes = [
    {
        path: 'invoice-item',
        component: InvoiceItemComponent,
        resolve: {
            'pagingParams': InvoiceItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'invoice-item/:id',
        component: InvoiceItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const invoiceItemPopupRoute: Routes = [
    {
        path: 'invoice-item-new',
        component: InvoiceItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-item/:id/edit',
        component: InvoiceItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'invoice-item/:id/delete',
        component: InvoiceItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.invoiceItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
