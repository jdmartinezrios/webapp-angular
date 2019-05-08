import { Route } from '@angular/router';

import { JhiDocsComponent } from './docs.component';
import {DashboardComponent} from '../../layouts';

export const docsRoute: Route = {
   path: 'docs',
    component: DashboardComponent,
    children: [
        {
            path: '',
            component: JhiDocsComponent,
            data: {
                pageTitle: 'global.menu.admin.apidocs'
            }
        }
    ]
};
