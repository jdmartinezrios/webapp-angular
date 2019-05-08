import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceHasState } from './invoice-has-state.model';
import { InvoiceHasStatePopupService } from './invoice-has-state-popup.service';
import { InvoiceHasStateService } from './invoice-has-state.service';
import { User, UserService } from '../../shared';
import { Invoice, InvoiceService } from '../invoice';

@Component({
    selector: 'jhi-invoice-has-state-dialog',
    templateUrl: './invoice-has-state-dialog.component.html'
})
export class InvoiceHasStateDialogComponent implements OnInit {

    invoiceHasState: InvoiceHasState;
    isSaving: boolean;

    users: User[];

    invoices: Invoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceHasStateService: InvoiceHasStateService,
        private userService: UserService,
        private invoiceService: InvoiceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.invoiceService.query()
            .subscribe((res: HttpResponse<Invoice[]>) => { this.invoices = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoiceHasState.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceHasStateService.update(this.invoiceHasState));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceHasStateService.create(this.invoiceHasState));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceHasState>>) {
        result.subscribe((res: HttpResponse<InvoiceHasState>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceHasState) {
        this.eventManager.broadcast({ name: 'invoiceHasStateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackInvoiceById(index: number, item: Invoice) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-has-state-popup',
    template: ''
})
export class InvoiceHasStatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceHasStatePopupService: InvoiceHasStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceHasStatePopupService
                    .open(InvoiceHasStateDialogComponent as Component, params['id']);
            } else {
                this.invoiceHasStatePopupService
                    .open(InvoiceHasStateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
