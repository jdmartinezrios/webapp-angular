import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RecipeItem } from './recipe-item.model';
import { RecipeItemService } from './recipe-item.service';

@Component({
    selector: 'jhi-recipe-item-detail',
    templateUrl: './recipe-item-detail.component.html'
})
export class RecipeItemDetailComponent implements OnInit, OnDestroy {

    recipeItem: RecipeItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private recipeItemService: RecipeItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRecipeItems();
    }

    load(id) {
        this.recipeItemService.find(id)
            .subscribe((recipeItemResponse: HttpResponse<RecipeItem>) => {
                this.recipeItem = recipeItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRecipeItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'recipeItemListModification',
            (response) => this.load(this.recipeItem.id)
        );
    }
}
