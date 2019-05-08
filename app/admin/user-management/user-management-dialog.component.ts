import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserModalService} from './user-modal.service';
import {AccountService, JhiLanguageHelper, Principal, User, UserService} from '../../shared';
import {FormArray, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';
import {Zone, ZoneService} from '../../entities/zone';
import {LocationService, Location} from '../../entities/location';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserMgmtDialogComponent implements OnInit, OnChanges {

    languages: any[];
    authorities: any[];
    isSaving: Boolean;
    error: string;
    success: string;
    user: any;
    zones: Zone[];
    eventSubscriber: Subscription;
    userForm: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private languageHelper: JhiLanguageHelper,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private account: AccountService,
        private principal: Principal,
        private locationService: LocationService,
        private zoneService: ZoneService,
        public formBuilder: FormBuilder,
        private router: Router,
        private jhiAlertService: JhiAlertService
    ) {
        this.createUserForm();
    }

    ngOnInit() {
        if (!this.user.id) {
            this.user.authorities = [];
        }
        this.isSaving = false;
        this.authorities = [];
        this.userService.authorities().subscribe((authorities) => {
            this.authorities = authorities;
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
        this.getSettingsAccount();
        this.registerChangeInLocations();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    addAuthorities(authority) {
        const index = this.user.authorities.indexOf(authority);
        if (index !== -1) {
            this.user.authorities.splice(index, 1);
        } else {
            this.user.authorities.push(authority);
        }
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe((response) => {
                this.onSaveSuccess(response);
                this.saveLocations();
            }, () => this.onSaveError());
        } else {
            this.user.login = this.user.email;
            this.userService.create(this.user).subscribe((response) => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({name: 'userListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    ngOnChanges() {
        this.rebuildForm();
    }

    getSettingsAccount() {

        console.log('user', this.user);
        this.locationService.query({
            'userId.equals': this.user.id
        }).subscribe((res: HttpResponse<Location[]>) => {
            this.user.locations = res.body;
            console.log('user locations ', this.user.locations);
            this.ngOnChanges();
        }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    rebuildForm() {
        this.setLocations(this.user.locations);
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
            location.zoneId = {id: location.zoneId, zoneName: location.zoneName};
        });
        const locationFGs = locations.map((location) => this.formBuilder.group(location));
        const locationFormArray = this.formBuilder.array(locationFGs);
        this.userForm.setControl('locations', locationFormArray);
    }

    addLocation() {
        // add address to the list
        this.locations.push(this.createLocationForm());
    }

    async removeLocation(i: number) {
        // remove address from the list

        localStorage.setItem('userLogin', this.user.login);
        const location: any = this.locations.at(i).value;
        if (location.id) {
            await this.activeModal.dismiss('cancel');
            this.router.navigate(['/', {outlets: {popup: 'location/' + location.id + '/delete'}}], {
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

                location['userId'] = this.user.id;
                console.log('location', location);
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

}

@Component({
    selector: 'jhi-user-dialog',
    template: ''
})
export class UserDialogComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['login']) {
                this.userModalService.open(UserMgmtDialogComponent as Component, params['login']);
            } else {
                this.userModalService.open(UserMgmtDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
