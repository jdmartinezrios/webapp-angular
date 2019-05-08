import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DashboardComponent } from './dashboard.component';

export const dashboardState: Route = {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_ASST', 'ROLE_PROV'],
        pageTitle: 'dashboard.title'
    },
    canActivate: [UserRouteAccessService]
};
