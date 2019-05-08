import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ShoppingCar } from './shopping-car.model';
import { ShoppingCarPopupService } from './shopping-car-popup.service';
import { ShoppingCarService } from './shopping-car.service';
import { Product, ProductService } from '../product';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-shopping-car-dialog',
    templateUrl: './shopping-car-dialog.component.html'
})
export class ShoppingCarDialogComponent implements OnInit {

    shoppingCar: ShoppingCar;
    isSaving: boolean;

    products: Product[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private shoppingCarService: ShoppingCarService,
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
        if (this.shoppingCar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.shoppingCarService.update(this.shoppingCar));
        } else {
            this.subscribeToSaveResponse(
                this.shoppingCarService.create(this.shoppingCar));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ShoppingCar>>) {
        result.subscribe((res: HttpResponse<ShoppingCar>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ShoppingCar) {
        this.eventManager.broadcast({ name: 'shoppingCarListModification', content: 'OK'});
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
    selector: 'jhi-shopping-car-popup',
    template: ''
})
export class ShoppingCarPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shoppingCarPopupService: ShoppingCarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.shoppingCarPopupService
                    .open(ShoppingCarDialogComponent as Component, params['id']);
            } else {
                this.shoppingCarPopupService
                    .open(ShoppingCarDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
