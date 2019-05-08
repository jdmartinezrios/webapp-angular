import { Route } from '@angular/router';

import { LogsComponent } from './logs.component';
import {DashboardComponent} from '../../layouts';

export const logsRoute: Route = {
   path: 'logs',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: LogsComponent,
            data: {
                pageTitle: 'logs.title'
            }
        }
    ]
};
