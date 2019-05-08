import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'jhi-dashboard-main',
    templateUrl: './dashboard-main.html',
    styleUrls: [
        './dashboard-main.scss'
    ]
})

export class DashboardMainComponent implements OnInit, AfterViewInit {

    ngOnInit() {

    }

    ngAfterViewInit() {
       window.scrollTo(0, 0);
    }

    sizeContent() {
        return localStorage.getItem('reduceSideNav');
    }
}
