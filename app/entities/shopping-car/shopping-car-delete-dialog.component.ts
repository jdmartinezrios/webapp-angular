import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ShoppingCar } from './shopping-car.model';
import { ShoppingCarPopupService } from './shopping-car-popup.service';
import { ShoppingCarService } from './shopping-car.service';

@Component({
    selector: 'jhi-shopping-car-delete-dialog',
    templateUrl: './shopping-car-delete-dialog.component.html'
})
export class ShoppingCarDeleteDialogComponent {

    shoppingCar: ShoppingCar;

    constructor(
        private shoppingCarService: ShoppingCarService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shoppingCarService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'shoppingCarListModification',
                content: 'Deleted an shoppingCar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shopping-car-delete-popup',
    template: ''
})
export class ShoppingCarDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private shoppingCarPopupService: ShoppingCarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.shoppingCarPopupService
                .open(ShoppingCarDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
