import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiscountList } from './discount-list.model';
import { DiscountListPopupService } from './discount-list-popup.service';
import { DiscountListService } from './discount-list.service';

@Component({
    selector: 'jhi-discount-list-delete-dialog',
    templateUrl: './discount-list-delete-dialog.component.html'
})
export class DiscountListDeleteDialogComponent {

    discountList: DiscountList;

    constructor(
        private discountListService: DiscountListService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discountListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'discountListListModification',
                content: 'Deleted an discountList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discount-list-delete-popup',
    template: ''
})
export class DiscountListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discountListPopupService: DiscountListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.discountListPopupService
                .open(DiscountListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
