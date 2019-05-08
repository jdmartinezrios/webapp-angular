import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductCategory } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-product-category',
    templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

currentAccount: any;
    productCategories: ProductCategory[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private productCategoryService: ProductCategoryService,
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
            this.productCategoryService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ProductCategory[]>) => this.productCategories = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.productCategoryService.query().subscribe(
            (res: HttpResponse<ProductCategory[]>) => {
                this.productCategories = res.body;
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
        this.registerChangeInProductCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProductCategory) {
        return item.id;
    }
    registerChangeInProductCategories() {
        this.eventSubscriber = this.eventManager.subscribe('productCategoryListModification', (response) => this.loadAll());
    }

    setActive(category, isActivated) {
        category.productCategoryEnabled = isActivated;

        this.productCategoryService.update(category).subscribe(
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
