import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceItem } from './invoice-item.model';
import { InvoiceItemService } from './invoice-item.service';

@Component({
    selector: 'jhi-invoice-item-detail',
    templateUrl: './invoice-item-detail.component.html'
})
export class InvoiceItemDetailComponent implements OnInit, OnDestroy {

    invoiceItem: InvoiceItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceItemService: InvoiceItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceItems();
    }

    load(id) {
        this.invoiceItemService.find(id)
            .subscribe((invoiceItemResponse: HttpResponse<InvoiceItem>) => {
                this.invoiceItem = invoiceItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceItemListModification',
            (response) => this.load(this.invoiceItem.id)
        );
    }
}
