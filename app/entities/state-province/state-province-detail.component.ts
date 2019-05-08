import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StateProvince } from './state-province.model';
import { StateProvinceService } from './state-province.service';

@Component({
    selector: 'jhi-state-province-detail',
    templateUrl: './state-province-detail.component.html'
})
export class StateProvinceDetailComponent implements OnInit, OnDestroy {

    stateProvince: StateProvince;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stateProvinceService: StateProvinceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStateProvinces();
    }

    load(id) {
        this.stateProvinceService.find(id)
            .subscribe((stateProvinceResponse: HttpResponse<StateProvince>) => {
                this.stateProvince = stateProvinceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStateProvinces() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stateProvinceListModification',
            (response) => this.load(this.stateProvince.id)
        );
    }
}
