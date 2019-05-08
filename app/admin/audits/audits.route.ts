import {Route} from '@angular/router';

import {AuditsComponent} from './audits.component';
import {DashboardComponent} from '../../layouts';

export const auditsRoute: Route = {
    path: 'audits',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: AuditsComponent,
            data: {
                pageTitle: 'audits.title'
            }
        }
    ]
};
