import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StockInput } from './stock-input.model';
import { StockInputPopupService } from './stock-input-popup.service';
import { StockInputService } from './stock-input.service';
import { Product, ProductService } from '../product';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-stock-input-dialog',
    templateUrl: './stock-input-dialog.component.html'
})
export class StockInputDialogComponent implements OnInit {

    stockInput: StockInput;
    isSaving: boolean;

    products: Product[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stockInputService: StockInputService,
        private productService: ProductService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stockInput.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stockInputService.update(this.stockInput));
        } else {
            this.subscribeToSaveResponse(
                this.stockInputService.create(this.stockInput));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StockInput>>) {
        result.subscribe((res: HttpResponse<StockInput>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StockInput) {
        this.eventManager.broadcast({ name: 'stockInputListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stock-input-popup',
    template: ''
})
export class StockInputPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockInputPopupService: StockInputPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stockInputPopupService
                    .open(StockInputDialogComponent as Component, params['id']);
            } else {
                this.stockInputPopupService
                    .open(StockInputDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
