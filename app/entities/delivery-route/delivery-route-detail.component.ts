import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DeliveryRoute } from './delivery-route.model';
import { DeliveryRouteService } from './delivery-route.service';

@Component({
    selector: 'jhi-delivery-route-detail',
    templateUrl: './delivery-route-detail.component.html'
})
export class DeliveryRouteDetailComponent implements OnInit, OnDestroy {

    deliveryRoute: DeliveryRoute;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private deliveryRouteService: DeliveryRouteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDeliveryRoutes();
    }

    load(id) {
        this.deliveryRouteService.find(id)
            .subscribe((deliveryRouteResponse: HttpResponse<DeliveryRoute>) => {
                this.deliveryRoute = deliveryRouteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDeliveryRoutes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'deliveryRouteListModification',
            (response) => this.load(this.deliveryRoute.id)
        );
    }
}
