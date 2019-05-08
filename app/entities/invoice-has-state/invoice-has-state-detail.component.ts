import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceHasState } from './invoice-has-state.model';
import { InvoiceHasStateService } from './invoice-has-state.service';

@Component({
    selector: 'jhi-invoice-has-state-detail',
    templateUrl: './invoice-has-state-detail.component.html'
})
export class InvoiceHasStateDetailComponent implements OnInit, OnDestroy {

    invoiceHasState: InvoiceHasState;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private invoiceHasStateService: InvoiceHasStateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInvoiceHasStates();
    }

    load(id) {
        this.invoiceHasStateService.find(id)
            .subscribe((invoiceHasStateResponse: HttpResponse<InvoiceHasState>) => {
                this.invoiceHasState = invoiceHasStateResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInvoiceHasStates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'invoiceHasStateListModification',
            (response) => this.load(this.invoiceHasState.id)
        );
    }
}
