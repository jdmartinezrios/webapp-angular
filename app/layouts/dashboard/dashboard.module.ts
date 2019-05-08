import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelcampoAdminModule } from '../../admin/admin.module';

// Dashboard Components
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard.header';
import { DashboardLeftSideComponent } from './dashboard-left-side/dashboard.left-side';
import { DashboardContentComponent } from './dashboard-content/dashboard.content';
import { DashboardMainComponent } from './dashboard-main/dashboard-main';
import { DashboardBreadcrumbComponent } from './dashboard-breadcrumb/dashboard-breadcrumb';
import { dashboardState } from './dashboard.routes';
import { DelcampoSharedModule } from '../../shared';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardHeaderComponent,
        DashboardLeftSideComponent,
        DashboardContentComponent,
        DashboardMainComponent,
        DashboardBreadcrumbComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        DelcampoAdminModule,
        DelcampoSharedModule,
        RouterModule.forRoot([dashboardState], { useHash: true })
    ],
    providers: [

    ]
})

export class DashboardModule { }
