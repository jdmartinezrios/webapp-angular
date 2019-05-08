import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PriceList } from './price-list.model';
import { PriceListPopupService } from './price-list-popup.service';
import { PriceListService } from './price-list.service';

@Component({
    selector: 'jhi-price-list-delete-dialog',
    templateUrl: './price-list-delete-dialog.component.html'
})
export class PriceListDeleteDialogComponent {

    priceList: PriceList;

    constructor(
        private priceListService: PriceListService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.priceListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'priceListListModification',
                content: 'Deleted an priceList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-price-list-delete-popup',
    template: ''
})
export class PriceListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private priceListPopupService: PriceListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.priceListPopupService
                .open(PriceListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
