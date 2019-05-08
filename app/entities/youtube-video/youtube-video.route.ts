import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { YoutubeVideoComponent } from './youtube-video.component';
import { YoutubeVideoDetailComponent } from './youtube-video-detail.component';
import { YoutubeVideoPopupComponent } from './youtube-video-dialog.component';
import { YoutubeVideoDeletePopupComponent } from './youtube-video-delete-dialog.component';
import { DashboardComponent } from '../../layouts';

@Injectable()
export class YoutubeVideoResolvePagingParams implements Resolve<any> {

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

export const youtubeVideoRoute: Routes = [
    {
        path: 'youtube-video',
        component: DashboardComponent,
        children: [{
            path: '',
            component: YoutubeVideoComponent,
            resolve: {
                'pagingParams': YoutubeVideoResolvePagingParams
            },
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.youtubeVideo.home.title'
            },
            canActivate: [UserRouteAccessService]
        }, {
            path: 'youtube-video/:id',
            component: YoutubeVideoDetailComponent,
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'delcampoApp.youtubeVideo.home.title'
            },
            canActivate: [UserRouteAccessService]
        }]
    }
];

export const youtubeVideoPopupRoute: Routes = [
    {
        path: 'youtube-video-new',
        component: YoutubeVideoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.youtubeVideo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'youtube-video/:id/edit',
        component: YoutubeVideoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.youtubeVideo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'youtube-video/:id/delete',
        component: YoutubeVideoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'delcampoApp.youtubeVideo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
