import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'jhi-dashboard-breadcrumb',
    templateUrl: './dashboard-breadcrumb.html',
    styleUrls: ['./dashboard-breadcrumb.scss']
})

export class DashboardBreadcrumbComponent implements AfterViewInit {
    path: string;

    constructor(private router: Router,
                private titleService: Title) {
    }

    ngAfterViewInit() {
        // this.path = this.router.url.substring(1);
        //this.path = this.titleService.getTitle();
        console.log('URL BREADCRUMB', this.router);
    }

    getTitle() {
        return this.titleService.getTitle();
    }

    sizeContent() {
        return localStorage.getItem('reduceSideNav');
    }

}
