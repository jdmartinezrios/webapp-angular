import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { YoutubeVideo } from './youtube-video.model';
import { YoutubeVideoPopupService } from './youtube-video-popup.service';
import { YoutubeVideoService } from './youtube-video.service';
import { Product, ProductService } from '../product';
import { Recipe, RecipeService } from '../recipe';

@Component({
    selector: 'jhi-youtube-video-dialog',
    templateUrl: './youtube-video-dialog.component.html'
})
export class YoutubeVideoDialogComponent implements OnInit {

    youtubeVideo: YoutubeVideo;
    isSaving: boolean;

    products: Product[];

    recipes: Recipe[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private youtubeVideoService: YoutubeVideoService,
        private productService: ProductService,
        private recipeService: RecipeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.recipeService.query()
            .subscribe((res: HttpResponse<Recipe[]>) => { this.recipes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.youtubeVideo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.youtubeVideoService.update(this.youtubeVideo));
        } else {
            this.subscribeToSaveResponse(
                this.youtubeVideoService.create(this.youtubeVideo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<YoutubeVideo>>) {
        result.subscribe((res: HttpResponse<YoutubeVideo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: YoutubeVideo) {
        this.eventManager.broadcast({ name: 'youtubeVideoListModification', content: 'OK'});
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

    trackRecipeById(index: number, item: Recipe) {
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
    selector: 'jhi-youtube-video-popup',
    template: ''
})
export class YoutubeVideoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private youtubeVideoPopupService: YoutubeVideoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.youtubeVideoPopupService
                    .open(YoutubeVideoDialogComponent as Component, params['id']);
            } else {
                this.youtubeVideoPopupService
                    .open(YoutubeVideoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
