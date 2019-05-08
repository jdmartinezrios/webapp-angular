import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PriceList } from './price-list.model';
import { PriceListPopupService } from './price-list-popup.service';
import { PriceListService } from './price-list.service';
import { Product, ProductService } from '../product';

@Component({
    selector: 'jhi-price-list-dialog',
    templateUrl: './price-list-dialog.component.html'
})
export class PriceListDialogComponent implements OnInit {

    priceList: PriceList;
    isSaving: boolean;

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private priceListService: PriceListService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.priceList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.priceListService.update(this.priceList));
        } else {
            this.subscribeToSaveResponse(
                this.priceListService.create(this.priceList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PriceList>>) {
        result.subscribe((res: HttpResponse<PriceList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PriceList) {
        this.eventManager.broadcast({ name: 'priceListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-price-list-popup',
    template: ''
})
export class PriceListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceListPopupService: PriceListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.priceListPopupService
                    .open(PriceListDialogComponent as Component, params['id']);
            } else {
                this.priceListPopupService
                    .open(PriceListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
