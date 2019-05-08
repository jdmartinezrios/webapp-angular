import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Recipe } from './recipe.model';
import { Product } from '../product/product.model';
import { RecipePopupService } from './recipe-popup.service';
import { RecipeService } from './recipe.service';
import { ProductService } from '../product/product.service';
import { RecipeItem, RecipeItemService } from '../recipe-item';
import { YoutubeVideo, YoutubeVideoService } from '../youtube-video';

@Component({
    selector: 'jhi-recipe-dialog',
    templateUrl: './recipe-dialog.component.html'
})
export class RecipeDialogComponent implements OnInit {

    recipe: Recipe;
    isSaving: boolean;
    products: Product[];
    recipeitems: RecipeItem[] = [];
    recipeItem: RecipeItem = new RecipeItem();

    youtubevideos: YoutubeVideo[];
    recipeItemsOptions = {add: false, list: false};

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private recipeService: RecipeService,
        private recipeItemService: RecipeItemService,
        private productService: ProductService,
        private youtubeVideoService: YoutubeVideoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.recipeItemService.query()
            .subscribe((res: HttpResponse<RecipeItem[]>) => { this.recipeitems = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.youtubeVideoService.query()
            .subscribe((res: HttpResponse<YoutubeVideo[]>) => { this.youtubevideos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    selectOption(key) {
        this.recipeItemsOptions[key] = !this.recipeItemsOptions[key];
        Object.keys(this.recipeItemsOptions).forEach((e) => {
            if (e !== key) {
                this.recipeItemsOptions[e] = false;
            }
        });
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.recipe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.recipeService.update(this.recipe));
        } else {
            this.subscribeToSaveResponse(
                this.recipeService.create(this.recipe));
        }
    }

    addRecipeItem() {
        this.recipeitems.push(this.recipeItem);
        this.recipeItem = new RecipeItem();
        this.selectOption('list');
        console.log('HASTA AHORA ', this.recipeitems);
    }

    /*saveRecipeItems(recipeId) {
        if (this.recipeitems.length > 0) {
            this.recipeitems.forEach((e) => {

            })
        }
    }*/

    private subscribeToSaveResponse(result: Observable<HttpResponse<Recipe>>) {
        result.subscribe((res: HttpResponse<Recipe>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private subscribeToSaveRecipeItemResponse(result: Observable<HttpResponse<RecipeItem>>) {
        result.subscribe((res: HttpResponse<RecipeItem>) =>
            this.onSaveSuccess(res.body, 'recipeItemListModification'), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Recipe, name?: string) {
        if (name) {
            this.eventManager.broadcast({ name, content: 'OK'});
        } else {
            this.eventManager.broadcast({ name: 'recipeListModification', content: 'OK'});
            this.isSaving = false;
            this.activeModal.dismiss(result);
        }
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRecipeItemById(index: number, item: RecipeItem) {
        return item.id;
    }

    trackYoutubeVideoById(index: number, item: YoutubeVideo) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-recipe-popup',
    template: ''
})
export class RecipePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recipePopupService: RecipePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.recipePopupService
                    .open(RecipeDialogComponent as Component, params['id']);
            } else {
                this.recipePopupService
                    .open(RecipeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
