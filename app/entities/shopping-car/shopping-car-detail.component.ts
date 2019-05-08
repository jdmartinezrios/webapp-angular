import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ShoppingCar } from './shopping-car.model';
import { ShoppingCarService } from './shopping-car.service';

@Component({
    selector: 'jhi-shopping-car-detail',
    templateUrl: './shopping-car-detail.component.html'
})
export class ShoppingCarDetailComponent implements OnInit, OnDestroy {

    shoppingCar: ShoppingCar;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private shoppingCarService: ShoppingCarService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInShoppingCars();
    }

    load(id) {
        this.shoppingCarService.find(id)
            .subscribe((shoppingCarResponse: HttpResponse<ShoppingCar>) => {
                this.shoppingCar = shoppingCarResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInShoppingCars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'shoppingCarListModification',
            (response) => this.load(this.shoppingCar.id)
        );
    }
}
