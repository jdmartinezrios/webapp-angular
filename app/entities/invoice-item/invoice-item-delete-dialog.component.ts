import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceItem } from './invoice-item.model';
import { InvoiceItemPopupService } from './invoice-item-popup.service';
import { InvoiceItemService } from './invoice-item.service';

@Component({
    selector: 'jhi-invoice-item-delete-dialog',
    templateUrl: './invoice-item-delete-dialog.component.html'
})
export class InvoiceItemDeleteDialogComponent {

    invoiceItem: InvoiceItem;

    constructor(
        private invoiceItemService: InvoiceItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'invoiceItemListModification',
                content: 'Deleted an invoiceItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-item-delete-popup',
    template: ''
})
export class InvoiceItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private invoiceItemPopupService: InvoiceItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.invoiceItemPopupService
                .open(InvoiceItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
