import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StockInput } from './stock-input.model';
import { StockInputService } from './stock-input.service';

@Component({
    selector: 'jhi-stock-input-detail',
    templateUrl: './stock-input-detail.component.html'
})
export class StockInputDetailComponent implements OnInit, OnDestroy {

    stockInput: StockInput;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stockInputService: StockInputService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStockInputs();
    }

    load(id) {
        this.stockInputService.find(id)
            .subscribe((stockInputResponse: HttpResponse<StockInput>) => {
                this.stockInput = stockInputResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStockInputs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stockInputListModification',
            (response) => this.load(this.stockInput.id)
        );
    }
}
