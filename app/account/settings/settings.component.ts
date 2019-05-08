import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Principal, AccountService, JhiLanguageHelper } from '../../shared';
import { Zone, ZoneService } from '../../entities/zone';
import { LocationService, Location } from '../../entities/location';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnChanges {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    maxDate: any;
    minDate: any;
    zones: Zone[];
    eventSubscriber: Subscription;

    userForm: FormGroup;

    constructor(
        private account: AccountService,
        private principal: Principal,
        private locationService: LocationService,
        private zoneService: ZoneService,
        public formBuilder: FormBuilder,
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private eventManager: JhiEventManager) {
        this.settingsAccount = { locations: [] };
        this.createUserForm();
    }

    ngOnInit() {
        this.getSettingsAccount();
        const today = new Date();
        this.maxDate = {
            year: today.getFullYear() - 18,
            month: today.getMonth() + 1,
            day: today.getDate()
        };
        this.minDate = {
            year: today.getFullYear() - 120,
            month: today.getMonth() + 1,
            day: today.getDate()
        };
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
        this.registerChangeInLocations();
    }

    ngOnChanges() {
        this.rebuildForm();
    }

    getSettingsAccount() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.locationService.query({
                'userId.equals': this.settingsAccount.id
            }).subscribe((res: HttpResponse<Location[]>) => {
                this.settingsAccount.locations = res.body;
                console.log(this.settingsAccount.locations);
                this.ngOnChanges();
            }, (res: HttpErrorResponse) => this.onError(res.message));
        });
    }

    rebuildForm() {
        this.setLocations(this.settingsAccount.locations);
    }

    createUserForm() {
        this.userForm = this.formBuilder.group({
            locations: this.formBuilder.array([this.createLocationForm()])
        });
    }

    createLocationForm() {
        return this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
            streetAddress: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(200)])],
            postalCode: [''],
            zoneId: ['', Validators.required]
        });
    }

    get locations(): FormArray {
        return this.userForm.get('locations') as FormArray;
    }

    setLocations(locations: Location[]) {
        locations.forEach((location: any) => {
            location.zoneId = { id: location.zoneId, zoneName: location.zoneName };
        });
        const locationFGs = locations.map((location) => this.formBuilder.group(location));
        const locationFormArray = this.formBuilder.array(locationFGs);
        this.userForm.setControl('locations', locationFormArray);
    }

    addLocation() {
        // add address to the list
        this.locations.push(this.createLocationForm());
    }

    removeLocation(i: number) {
        // remove address from the list
        const location: Location = this.locations.at(i).value;
        if (location.id) {
            this.router.navigate(['/', { outlets: { popup: 'location/' + location.id + '/delete' } }], {
                replaceUrl: true,
                queryParamsHandling: 'merge'
            });
            // this.locationService.delete(location.id).subscribe();
        } else {
            this.locations.removeAt(i);
        }
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', (response) => this.getSettingsAccount());
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.saveLocations();
            this.error = null;
            this.success = 'OK';
            this.getSettingsAccount();
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    saveLocations() {
        const locations: Location[] = this.locations.value;
        locations.forEach(async(location: any) => {
            location.zoneId = location.zoneId.id;
            if (location.id !== undefined) {
                await this.locationService.update(location).subscribe();
            } else {
                await this.locationService.create(location).subscribe();
            }
        });
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
}
