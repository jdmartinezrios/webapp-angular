import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StockInputHasState } from './stock-input-has-state.model';
import { StockInputHasStatePopupService } from './stock-input-has-state-popup.service';
import { StockInputHasStateService } from './stock-input-has-state.service';

@Component({
    selector: 'jhi-stock-input-has-state-delete-dialog',
    templateUrl: './stock-input-has-state-delete-dialog.component.html'
})
export class StockInputHasStateDeleteDialogComponent {

    stockInputHasState: StockInputHasState;

    constructor(
        private stockInputHasStateService: StockInputHasStateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockInputHasStateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stockInputHasStateListModification',
                content: 'Deleted an stockInputHasState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-input-has-state-delete-popup',
    template: ''
})
export class StockInputHasStateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockInputHasStatePopupService: StockInputHasStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stockInputHasStatePopupService
                .open(StockInputHasStateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
