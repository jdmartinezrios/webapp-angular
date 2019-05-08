import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiscountList } from './discount-list.model';
import { DiscountListPopupService } from './discount-list-popup.service';
import { DiscountListService } from './discount-list.service';
import { Product, ProductService } from '../product';

@Component({
    selector: 'jhi-discount-list-dialog',
    templateUrl: './discount-list-dialog.component.html'
})
export class DiscountListDialogComponent implements OnInit {

    discountList: DiscountList;
    isSaving: boolean;

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private discountListService: DiscountListService,
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
        if (this.discountList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discountListService.update(this.discountList));
        } else {
            this.subscribeToSaveResponse(
                this.discountListService.create(this.discountList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DiscountList>>) {
        result.subscribe((res: HttpResponse<DiscountList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DiscountList) {
        this.eventManager.broadcast({ name: 'discountListListModification', content: 'OK'});
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
    selector: 'jhi-discount-list-popup',
    template: ''
})
export class DiscountListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discountListPopupService: DiscountListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.discountListPopupService
                    .open(DiscountListDialogComponent as Component, params['id']);
            } else {
                this.discountListPopupService
                    .open(DiscountListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
