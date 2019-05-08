import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductType } from './product-type.model';
import { ProductTypeService } from './product-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-type',
    templateUrl: './product-type.component.html'
})
export class ProductTypeComponent implements OnInit, OnDestroy {

currentAccount: any;
    productTypes: ProductType[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private productTypeService: ProductTypeService,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.productTypeService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ProductType[]>) => this.productTypes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.productTypeService.query().subscribe(
            (res: HttpResponse<ProductType[]>) => {
                this.productTypes = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProductTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductType) {
        return item.id;
    }
    registerChangeInProductTypes() {
        this.eventSubscriber = this.eventManager.subscribe('productTypeListModification', (response) => this.loadAll());
    }

    setActive(type, isActivated) {
        type.productTypeEnabled = isActivated;

        this.productTypeService.update(type).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.error = null;
                    this.success = 'OK';
                    this.loadAll();
                } else {
                    this.success = null;
                    this.error = 'ERROR';
                }
            });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
