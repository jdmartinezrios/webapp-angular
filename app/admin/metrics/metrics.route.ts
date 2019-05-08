import {Route} from '@angular/router';

import {JhiMetricsMonitoringComponent} from './metrics.component';
import {DashboardComponent} from '../../layouts';

export const metricsRoute: Route = {
    path: 'jhi-metrics',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: JhiMetricsMonitoringComponent,
            data: {
                pageTitle: 'metrics.title'
            }
        }
    ]
};
