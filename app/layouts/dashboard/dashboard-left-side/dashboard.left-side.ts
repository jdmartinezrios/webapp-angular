import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

import 'jquery';

declare var $: any;

@Component({
    selector: 'jhi-dashboard-left-side',
    templateUrl: './dashboard.left-side.html',
    styleUrls: [
        'dashboard.left-side.scss'
    ],
    animations: [
        trigger('slideIn', [
            state('*', style({ 'overflow-y': 'hidden' })),
            state('void', style({ 'overflow-y': 'hidden' })),
            transition('* => void', [
                style({ height: '*' }),
                animate('450ms ease-in-out', style({ height: 0 }))
            ]),
            transition('void => *', [
                style({ height: '0' }),
                animate('450ms ease-in-out', style({ height: '*' }))
            ])
        ])
    ]
})

export class DashboardLeftSideComponent implements OnInit, AfterViewChecked {

    linkActive: {};

    constructor(private changeDetector: ChangeDetectorRef) {
        localStorage.getItem('slideToogle');
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    ngOnInit() {
        const currentValueLinkActive = JSON.parse(localStorage.getItem('delcampo-linkActive'));
        if (currentValueLinkActive && Object.keys(currentValueLinkActive).length > 0) {
            this.linkActive = currentValueLinkActive;
        } else {
            this.linkActive = {
                'administration': false,
                'config': false,
                'products': false,
                'deliveries': false
            };
            localStorage.setItem('delcampo-linkActive', JSON.stringify(this.linkActive));
        }
    }

    sizeSideNav() {
        return localStorage.getItem('reduceSideNav');
    }

    onClickMenuItem(option: string) {
        Object.keys(this.linkActive).forEach((currentLink: any) => {
            this.linkActive[currentLink] = currentLink === option ? !this.linkActive[currentLink] : false;
        });
        localStorage.setItem('delcampo-linkActive', JSON.stringify(this.linkActive));
    }

}
