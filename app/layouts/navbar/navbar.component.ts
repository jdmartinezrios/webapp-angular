import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from '../../shared';

import { VERSION } from '../../app.constants';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    bgNavbar: any;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        public router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        $(window).resize(function() {
            const width = $(window).width();
            if (width < 768) {
                $('#first-logo').addClass('navbar-logoDelcampo');
                window.onscroll = undefined;
            } else {
                window.onscroll = function() {
                    scrollFunction();
                };
            }
        });

        // this.changeBgNavbar();
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                $('#navbarFix').addClass('bg-navCampo animated slideInDown');
                $('#navbarFix').removeClass('bg-transparent');
                $('#navbarFix').addClass('pt-1');
                $('#navbarFix').addClass('pb-1');                
                $('#first-logo').addClass('navbar-logoDelcampo');
                $('#first-logo').removeClass('bg-transparent');
                $('#logoCampo').show();
                $('#delCampo').hide();
            } else {
                $('#navbarFix').removeClass('bg-navCampo animated slideInDown');
                $('#navbarFix').addClass('bg-transparent');
                $('#navbarFix').removeClass('pt-1');
                $('#navbarFix').removeClass('pb-1');
                $('#first-logo').removeClass('navbar-logoDelcampo');
                $('#first-logo').addClass('bg-transparent');
                $('#logoCampo').hide();
                $('#delCampo').show();
            }
        }
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
        $(window).scrollTop(0);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
