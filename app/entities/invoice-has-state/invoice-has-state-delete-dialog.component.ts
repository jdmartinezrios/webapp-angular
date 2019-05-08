import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceHasState } from './invoice-has-state.model';
import { InvoiceHasStatePopupService } from './invoice-has-state-popup.service';
import { InvoiceHasStateService } from './invoice-has-state.service';

@Component({
    selector: 'jhi-invoice-has-state-delete-dialog',
    templateUrl: './invoice-has-state-delete-dialog.component.html'
})
export class InvoiceHasStateDeleteDialogComponent {

    invoiceHasState: InvoiceHasState;

    constructor(
        private invoiceHasStateService: InvoiceHasStateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceHasStateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceHasStateListModification',
                content: 'Deleted an invoiceHasState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-has-state-delete-popup',
    template: ''
})
export class InvoiceHasStateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceHasStatePopupService: InvoiceHasStatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceHasStatePopupService
                .open(InvoiceHasStateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
