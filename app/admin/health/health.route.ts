import {Route} from '@angular/router';

import {JhiHealthCheckComponent} from './health.component';
import {DashboardComponent} from '../../layouts';

export const healthRoute: Route = {
    path: 'jhi-health',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: JhiHealthCheckComponent,
            data: {
                pageTitle: 'health.title'
            }
        }
    ]
};
