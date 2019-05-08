import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RecipeItem } from './recipe-item.model';
import { RecipeItemPopupService } from './recipe-item-popup.service';
import { RecipeItemService } from './recipe-item.service';

@Component({
    selector: 'jhi-recipe-item-delete-dialog',
    templateUrl: './recipe-item-delete-dialog.component.html'
})
export class RecipeItemDeleteDialogComponent {

    recipeItem: RecipeItem;

    constructor(
        private recipeItemService: RecipeItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recipeItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'recipeItemListModification',
                content: 'Deleted an recipeItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recipe-item-delete-popup',
    template: ''
})
export class RecipeItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recipeItemPopupService: RecipeItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.recipeItemPopupService
                .open(RecipeItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
