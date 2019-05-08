import { Component, OnInit } from '@angular/core';
import { JhiLanguageHelper, Principal, LoginService, AccountService } from '../../../shared';
import { JhiLanguageService } from 'ng-jhipster';
import { Router } from '@angular/router';
import 'bootstrap';
import 'jquery';

declare var $: any;

@Component({
    selector: 'jhi-dashboard-header',
    templateUrl: './dashboard.header.html',
    styleUrls: [
        'dashboard.header.scss'
    ]
})

export class DashboardHeaderComponent implements OnInit {
    reduceSideNav: boolean;
    size: any;
    sizeNav: any;
    logoAdmin: any;
    settingsAccount: any;
    pathImage = '../../../../content/images/LogoCampo.png';

    constructor(
        public principal: Principal,
        public login: LoginService,
        public router: Router
    ) {
        this.reduceSideNav = true;
        this.settingsAccount = { locations: [] };
    }

    ngOnInit() {
      $(window).resize(() => {
        const sideWidth = $(window).width();
        if (sideWidth < 768) {
            this.sideHide();
        } else {
            this.sideShow();
        }
      });
      this.getSettingsAccount();
    }

    sideHide() {
      localStorage.setItem('reduceSideNav', 'reduceSide');
      localStorage.setItem('reduceLogo', 'reduceLogo');
      localStorage.setItem('logiAdmin', 'logoAdmin-hide');
    }

    sideShow() {
      localStorage.setItem('reduceSideNav', 'extendedSide');
      localStorage.setItem('reduceLogo', 'extendedLogo');
      localStorage.setItem('logiAdmin', 'logoAdmin-show');
    }

    getSettingsAccount() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
    }

    copyAccount(account) {
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            phoneNumber: account.phoneNumber,
            birthdate: account.birthdate ? {
                year: new Date(account.birthdate).getFullYear(),
                month: new Date(account.birthdate).getMonth() + 1,
                day: new Date(account.birthdate).getUTCDate()
            } : undefined
        };
    }

    logout() {
        this.login.logout();
        this.router.navigate(['']);
    }

    test() {
        return localStorage.getItem('logiAdmin');
    }

    test2() {
        return localStorage.getItem('reduceLogo');
    }

    test3() {
        return localStorage.getItem('reduceSideNav');
    }

    toogleSideNav() {
        if (this.reduceSideNav) {
            this.reduceSideNav = false;
            localStorage.setItem('reduceSideNav', 'reduceSide');
            localStorage.setItem('reduceLogo', 'reduceLogo');
            localStorage.setItem('logiAdmin', 'logoAdmin-hide');
        } else {
            this.reduceSideNav = true;
            localStorage.setItem('reduceSideNav', 'extendedSide');
            localStorage.setItem('reduceLogo', 'extendedLogo');
            localStorage.setItem('logiAdmin', 'logoAdmin-show');
        }
    }
}
