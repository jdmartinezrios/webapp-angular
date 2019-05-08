import {Route} from '@angular/router';

import {JhiConfigurationComponent} from './configuration.component';
import {DashboardComponent} from '../../layouts';

export const configurationRoute: Route = {
    path: 'jhi-configuration',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: JhiConfigurationComponent,
            data: {
                pageTitle: 'configuration.title'
            }
        }
    ]
};
