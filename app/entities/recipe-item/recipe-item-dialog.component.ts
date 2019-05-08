import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RecipeItem } from './recipe-item.model';
import { RecipeItemPopupService } from './recipe-item-popup.service';
import { RecipeItemService } from './recipe-item.service';
import { Product, ProductService } from '../product';

@Component({
    selector: 'jhi-recipe-item-dialog',
    templateUrl: './recipe-item-dialog.component.html'
})
export class RecipeItemDialogComponent implements OnInit {

    recipeItem: RecipeItem;
    isSaving: boolean;

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private recipeItemService: RecipeItemService,
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
        if (this.recipeItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.recipeItemService.update(this.recipeItem));
        } else {
            this.subscribeToSaveResponse(
                this.recipeItemService.create(this.recipeItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RecipeItem>>) {
        result.subscribe((res: HttpResponse<RecipeItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RecipeItem) {
        this.eventManager.broadcast({ name: 'recipeItemListModification', content: 'OK'});
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
    selector: 'jhi-recipe-item-popup',
    template: ''
})
export class RecipeItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recipeItemPopupService: RecipeItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.recipeItemPopupService
                    .open(RecipeItemDialogComponent as Component, params['id']);
            } else {
                this.recipeItemPopupService
                    .open(RecipeItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
