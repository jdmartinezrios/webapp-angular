import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ManufacturedProductType } from './manufactured-product-type.model';
import { ManufacturedProductTypePopupService } from './manufactured-product-type-popup.service';
import { ManufacturedProductTypeService } from './manufactured-product-type.service';

@Component({
    selector: 'jhi-manufactured-product-type-dialog',
    templateUrl: './manufactured-product-type-dialog.component.html'
})
export class ManufacturedProductTypeDialogComponent implements OnInit {

    manufacturedProductType: ManufacturedProductType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private manufacturedProductTypeService: ManufacturedProductTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.manufacturedProductType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.manufacturedProductTypeService.update(this.manufacturedProductType));
        } else {
            this.subscribeToSaveResponse(
                this.manufacturedProductTypeService.create(this.manufacturedProductType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ManufacturedProductType>>) {
        result.subscribe((res: HttpResponse<ManufacturedProductType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ManufacturedProductType) {
        this.eventManager.broadcast({ name: 'manufacturedProductTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-manufactured-product-type-popup',
    template: ''
})
export class ManufacturedProductTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private manufacturedProductTypePopupService: ManufacturedProductTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.manufacturedProductTypePopupService
                    .open(ManufacturedProductTypeDialogComponent as Component, params['id']);
            } else {
                this.manufacturedProductTypePopupService
                    .open(ManufacturedProductTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
