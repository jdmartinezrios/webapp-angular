import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PriceList } from './price-list.model';
import { PriceListService } from './price-list.service';

@Component({
    selector: 'jhi-price-list-detail',
    templateUrl: './price-list-detail.component.html'
})
export class PriceListDetailComponent implements OnInit, OnDestroy {

    priceList: PriceList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private priceListService: PriceListService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPriceLists();
    }

    load(id) {
        this.priceListService.find(id)
            .subscribe((priceListResponse: HttpResponse<PriceList>) => {
                this.priceList = priceListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPriceLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'priceListListModification',
            (response) => this.load(this.priceList.id)
        );
    }
}
