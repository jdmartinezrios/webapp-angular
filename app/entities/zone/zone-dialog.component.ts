import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Zone } from './zone.model';
import { ZonePopupService } from './zone-popup.service';
import { ZoneService } from './zone.service';
import { City, CityService } from '../city';

@Component({
    selector: 'jhi-zone-dialog',
    templateUrl: './zone-dialog.component.html'
})
export class ZoneDialogComponent implements OnInit {

    zone: Zone;
    isSaving: boolean;

    cities: City[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private zoneService: ZoneService,
        private cityService: CityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cityService.query()
            .subscribe((res: HttpResponse<City[]>) => { this.cities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.zone.id !== undefined) {
            this.subscribeToSaveResponse(
                this.zoneService.update(this.zone));
        } else {
            this.subscribeToSaveResponse(
                this.zoneService.create(this.zone));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Zone>>) {
        result.subscribe((res: HttpResponse<Zone>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Zone) {
        this.eventManager.broadcast({ name: 'zoneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-zone-popup',
    template: ''
})
export class ZonePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private zonePopupService: ZonePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.zonePopupService
                    .open(ZoneDialogComponent as Component, params['id']);
            } else {
                this.zonePopupService
                    .open(ZoneDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
