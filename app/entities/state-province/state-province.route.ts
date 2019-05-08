import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StateProvinceComponent } from './state-province.component';
import { StateProvinceDetailComponent } from './state-province-detail.component';
import { StateProvincePopupComponent } from './state-province-dialog.component';
import { StateProvinceDeletePopupComponent } from './state-province-delete-dialog.component';
import { DashboardComponent } from '../../layouts';

@Injectable()
export class StateProvinceResolvePagingParams implements Resolve<any> {

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

export const stateProvinceRoute: Routes = [
    {
        path: 'state-province',
        component: DashboardComponent,
        children: [{
            path: '',
            component: StateProvinceComponent,
            resolve: {
                'pagingParams': StateProvinceResolvePagingParams
            },
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.stateProvince.home.title'
            },
            canActivate: [UserRouteAccessService]
        }, {
            path: 'state-province/:id',
            component: StateProvinceDetailComponent,
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.stateProvince.home.title'
            },
            canActivate: [UserRouteAccessService]
        }]
    }
];

export const stateProvincePopupRoute: Routes = [
    {
        path: 'state-province-new',
        component: StateProvincePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stateProvince.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-province/:id/edit',
        component: StateProvincePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stateProvince.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-province/:id/delete',
        component: StateProvinceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.stateProvince.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
