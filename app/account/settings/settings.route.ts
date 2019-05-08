import {Route} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {SettingsComponent} from './settings.component';
import {DashboardComponent} from '../../layouts';

export const settingsRoute: Route = {

    path: 'settings',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: SettingsComponent,
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.settings'
            },
            canActivate: [UserRouteAccessService]
        }
    ]

};
