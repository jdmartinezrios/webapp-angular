import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PasswordComponent } from './password.component';
import { DashboardComponent } from '../../layouts';

export const passwordRoute: Route = {
    path: 'password',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: PasswordComponent,
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.password'
            },
            canActivate: [UserRouteAccessService]
        }
    ]
};
