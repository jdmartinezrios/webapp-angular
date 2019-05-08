import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InvoiceItem } from './invoice-item.model';
import { InvoiceItemPopupService } from './invoice-item-popup.service';
import { InvoiceItemService } from './invoice-item.service';
import { Invoice, InvoiceService } from '../invoice';
import { Product, ProductService } from '../product';

@Component({
    selector: 'jhi-invoice-item-dialog',
    templateUrl: './invoice-item-dialog.component.html'
})
export class InvoiceItemDialogComponent implements OnInit {

    invoiceItem: InvoiceItem;
    isSaving: boolean;

    invoices: Invoice[];

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private invoiceItemService: InvoiceItemService,
        private invoiceService: InvoiceService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.invoiceService.query()
            .subscribe((res: HttpResponse<Invoice[]>) => { this.invoices = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.invoiceItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.invoiceItemService.update(this.invoiceItem));
        } else {
            this.subscribeToSaveResponse(
                this.invoiceItemService.create(this.invoiceItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceItem>>) {
        result.subscribe((res: HttpResponse<InvoiceItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceItem) {
        this.eventManager.broadcast({ name: 'invoiceItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInvoiceById(index: number, item: Invoice) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-invoice-item-popup',
    template: ''
})
export class InvoiceItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceItemPopupService: InvoiceItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.invoiceItemPopupService
                    .open(InvoiceItemDialogComponent as Component, params['id']);
            } else {
                this.invoiceItemPopupService
                    .open(InvoiceItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
