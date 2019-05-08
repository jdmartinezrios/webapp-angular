import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ManufacturedProductTypeComponent } from './manufactured-product-type.component';
import { ManufacturedProductTypeDetailComponent } from './manufactured-product-type-detail.component';
import { ManufacturedProductTypePopupComponent } from './manufactured-product-type-dialog.component';
import { ManufacturedProductTypeDeletePopupComponent } from './manufactured-product-type-delete-dialog.component';
import { DashboardComponent } from '../../layouts';

@Injectable()
export class ManufacturedProductTypeResolvePagingParams implements Resolve<any> {

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

export const manufacturedProductTypeRoute: Routes = [
  {
      path: 'manufactured-product-type',
      component: DashboardComponent,
      children: [
        {
            path: '',
            component: ManufacturedProductTypeComponent,
            resolve: {
                'pagingParams': ManufacturedProductTypeResolvePagingParams
            },
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.manufacturedProductType.home.title'
            },
            canActivate: [UserRouteAccessService]
        }, {
            path: 'manufactured-product-type/:id',
            component: ManufacturedProductTypeDetailComponent,
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.manufacturedProductType.home.title'
            },
            canActivate: [UserRouteAccessService]
        }
      ]
  }
];

export const manufacturedProductTypePopupRoute: Routes = [
    {
        path: 'manufactured-product-type-new',
        component: ManufacturedProductTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.manufacturedProductType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufactured-product-type/:id/edit',
        component: ManufacturedProductTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.manufacturedProductType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manufactured-product-type/:id/delete',
        component: ManufacturedProductTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.manufacturedProductType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
