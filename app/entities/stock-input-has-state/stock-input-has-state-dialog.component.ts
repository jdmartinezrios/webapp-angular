import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StockInputHasState } from './stock-input-has-state.model';
import { StockInputHasStatePopupService } from './stock-input-has-state-popup.service';
import { StockInputHasStateService } from './stock-input-has-state.service';
import { StockInput, StockInputService } from '../stock-input';

@Component({
    selector: 'jhi-stock-input-has-state-dialog',
    templateUrl: './stock-input-has-state-dialog.component.html'
})
export class StockInputHasStateDialogComponent implements OnInit {

    stockInputHasState: StockInputHasState;
    isSaving: boolean;

    stockinputs: StockInput[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stockInputHasStateService: StockInputHasStateService,
        private stockInputService: StockInputService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stockInputService.query()
            .subscribe((res: HttpResponse<StockInput[]>) => { this.stockinputs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stockInputHasState.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stockInputHasStateService.update(this.stockInputHasState));
        } else {
            this.subscribeToSaveResponse(
                this.stockInputHasStateService.create(this.stockInputHasState));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StockInputHasState>>) {
        result.subscribe((res: HttpResponse<StockInputHasState>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StockInputHasState) {
        this.eventManager.broadcast({ name: 'stockInputHasStateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStockInputById(index: number, item: StockInput) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stock-input-has-state-popup',
    template: ''
})
export class StockInputHasStatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockInputHasStatePopupService: StockInputHasStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stockInputHasStatePopupService
                    .open(StockInputHasStateDialogComponent as Component, params['id']);
            } else {
                this.stockInputHasStatePopupService
                    .open(StockInputHasStateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
