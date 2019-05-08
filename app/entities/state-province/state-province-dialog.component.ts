import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StateProvince } from './state-province.model';
import { StateProvincePopupService } from './state-province-popup.service';
import { StateProvinceService } from './state-province.service';
import { Country, CountryService } from '../country';

@Component({
    selector: 'jhi-state-province-dialog',
    templateUrl: './state-province-dialog.component.html'
})
export class StateProvinceDialogComponent implements OnInit {

    stateProvince: StateProvince;
    isSaving: boolean;

    countries: Country[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stateProvinceService: StateProvinceService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stateProvince.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stateProvinceService.update(this.stateProvince));
        } else {
            this.subscribeToSaveResponse(
                this.stateProvinceService.create(this.stateProvince));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StateProvince>>) {
        result.subscribe((res: HttpResponse<StateProvince>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StateProvince) {
        this.eventManager.broadcast({ name: 'stateProvinceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-state-province-popup',
    template: ''
})
export class StateProvincePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stateProvincePopupService: StateProvincePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stateProvincePopupService
                    .open(StateProvinceDialogComponent as Component, params['id']);
            } else {
                this.stateProvincePopupService
                    .open(StateProvinceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
