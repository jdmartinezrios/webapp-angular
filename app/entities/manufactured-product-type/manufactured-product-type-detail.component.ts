import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ManufacturedProductType } from './manufactured-product-type.model';
import { ManufacturedProductTypeService } from './manufactured-product-type.service';

@Component({
    selector: 'jhi-manufactured-product-type-detail',
    templateUrl: './manufactured-product-type-detail.component.html'
})
export class ManufacturedProductTypeDetailComponent implements OnInit, OnDestroy {

    manufacturedProductType: ManufacturedProductType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private manufacturedProductTypeService: ManufacturedProductTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInManufacturedProductTypes();
    }

    load(id) {
        this.manufacturedProductTypeService.find(id)
            .subscribe((manufacturedProductTypeResponse: HttpResponse<ManufacturedProductType>) => {
                this.manufacturedProductType = manufacturedProductTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInManufacturedProductTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'manufacturedProductTypeListModification',
            (response) => this.load(this.manufacturedProductType.id)
        );
    }
}
