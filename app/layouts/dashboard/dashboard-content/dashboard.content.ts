import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-dashboard-content',
    templateUrl: './dahsboard.content.html',
    styleUrls: [
        'dashboard.content.scss'
    ]
})

export class DashboardContentComponent {
    constructor() { }

    sizeContent() {
        return localStorage.getItem('reduceSideNav');
    }
}
