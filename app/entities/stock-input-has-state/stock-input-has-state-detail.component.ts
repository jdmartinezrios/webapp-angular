import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StockInputHasState } from './stock-input-has-state.model';
import { StockInputHasStateService } from './stock-input-has-state.service';

@Component({
    selector: 'jhi-stock-input-has-state-detail',
    templateUrl: './stock-input-has-state-detail.component.html'
})
export class StockInputHasStateDetailComponent implements OnInit, OnDestroy {

    stockInputHasState: StockInputHasState;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stockInputHasStateService: StockInputHasStateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStockInputHasStates();
    }

    load(id) {
        this.stockInputHasStateService.find(id)
            .subscribe((stockInputHasStateResponse: HttpResponse<StockInputHasState>) => {
                this.stockInputHasState = stockInputHasStateResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStockInputHasStates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stockInputHasStateListModification',
            (response) => this.load(this.stockInputHasState.id)
        );
    }
}
