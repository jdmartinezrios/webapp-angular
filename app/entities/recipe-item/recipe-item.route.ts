import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RecipeItemComponent } from './recipe-item.component';
import { RecipeItemDetailComponent } from './recipe-item-detail.component';
import { RecipeItemPopupComponent } from './recipe-item-dialog.component';
import { RecipeItemDeletePopupComponent } from './recipe-item-delete-dialog.component';

@Injectable()
export class RecipeItemResolvePagingParams implements Resolve<any> {

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

export const recipeItemRoute: Routes = [
    {
        path: 'recipe-item',
        component: RecipeItemComponent,
        resolve: {
            'pagingParams': RecipeItemResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.recipeItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'recipe-item/:id',
        component: RecipeItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.recipeItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recipeItemPopupRoute: Routes = [
    {
        path: 'recipe-item-new',
        component: RecipeItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.recipeItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recipe-item/:id/edit',
        component: RecipeItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.recipeItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recipe-item/:id/delete',
        component: RecipeItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.recipeItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
