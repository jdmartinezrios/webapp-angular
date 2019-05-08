import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ZoneComponent } from './zone.component';
import { ZoneDetailComponent } from './zone-detail.component';
import { ZonePopupComponent } from './zone-dialog.component';
import { ZoneDeletePopupComponent } from './zone-delete-dialog.component';
import { DashboardComponent } from '../../layouts';

@Injectable()
export class ZoneResolvePagingParams implements Resolve<any> {

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

export const zoneRoute: Routes = [
    {
        path: 'zone',
        component: DashboardComponent,
        children: [{
            path: '',
            component: ZoneComponent,
            resolve: {
                'pagingParams': ZoneResolvePagingParams
            },
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.zone.home.title'
            },
            canActivate: [UserRouteAccessService]
        }, {
            path: 'zone/:id',
            component: ZoneDetailComponent,
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.zone.home.title'
            },
            canActivate: [UserRouteAccessService]
        }]
    }
];

export const zonePopupRoute: Routes = [
    {
        path: 'zone-new',
        component: ZonePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.zone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'zone/:id/edit',
        component: ZonePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.zone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'zone/:id/delete',
        component: ZoneDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.zone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
