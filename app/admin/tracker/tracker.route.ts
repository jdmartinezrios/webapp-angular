import { Route } from '@angular/router';

import { JhiTrackerComponent } from './tracker.component';
import {DashboardComponent} from '../../layouts';

export const trackerRoute: Route = {
   path: 'jhi-tracker',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: JhiTrackerComponent,
            data: {
                pageTitle: 'tracker.title'
            }
        }
    ]
};
