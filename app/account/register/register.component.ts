import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Register } from './register.service';
import { LoginModalService, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../../shared';
import { Zone, ZoneService } from '../../entities/zone';
import 'jquery';

declare var $: any;
@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    zones: Zone[];

    constructor(
        private zoneService: ZoneService,
        private languageService: JhiLanguageService,
        private jhiAlertService: JhiAlertService,
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer
        ) {
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.languageService.getCurrent().then((key) => {
                this.registerAccount.langKey = key;
                this.registerAccount.login = this.registerAccount.email;
                this.registerService.save(this.registerAccount).subscribe(() => {
                    this.success = true;
                }, (response) => this.processError(response));
            });
        }
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }

    searchZone(event) {
        this.zoneService.query({
            'zoneName.contains': event.query,
            'zoneEnabled.equals': true
        }).subscribe(
            (res: HttpResponse<Zone[]>) => this.zones = res.body,
            (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null)
        );
    }

    handleDropdownZone(event) {
        // event.query = current value in input field
        this.zoneService.query({
            'zoneEnabled.equals': true
        }).subscribe(
            (res: HttpResponse<Zone[]>) => this.zones = res.body,
            (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null)
        );
    }
}
