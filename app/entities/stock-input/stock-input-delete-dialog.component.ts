import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StockInput } from './stock-input.model';
import { StockInputPopupService } from './stock-input-popup.service';
import { StockInputService } from './stock-input.service';

@Component({
    selector: 'jhi-stock-input-delete-dialog',
    templateUrl: './stock-input-delete-dialog.component.html'
})
export class StockInputDeleteDialogComponent {

    stockInput: StockInput;

    constructor(
        private stockInputService: StockInputService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stockInputService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stockInputListModification',
                content: 'Deleted an stockInput'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stock-input-delete-popup',
    template: ''
})
export class StockInputDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stockInputPopupService: StockInputPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stockInputPopupService
                .open(StockInputDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
