import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DiscountList } from './discount-list.model';
import { DiscountListService } from './discount-list.service';

@Component({
    selector: 'jhi-discount-list-detail',
    templateUrl: './discount-list-detail.component.html'
})
export class DiscountListDetailComponent implements OnInit, OnDestroy {

    discountList: DiscountList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private discountListService: DiscountListService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiscountLists();
    }

    load(id) {
        this.discountListService.find(id)
            .subscribe((discountListResponse: HttpResponse<DiscountList>) => {
                this.discountList = discountListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiscountLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'discountListListModification',
            (response) => this.load(this.discountList.id)
        );
    }
}
