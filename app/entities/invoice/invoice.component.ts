import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { InvoiceHasStateService } from '../invoice-has-state/invoice-has-state.service';
import { InvoiceHasState } from '../invoice-has-state/invoice-has-state.model';

@Component({
    selector: 'jhi-invoice',
    templateUrl: './invoice.component.html',
    providers: [ InvoiceHasStateService ]
})
export class InvoiceComponent implements OnInit, OnDestroy {

currentAccount: any;
    invoices: Invoice[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    userId: number;
    userLogin: string;
    constructor(
        private invoiceService: InvoiceService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private invoiceHasStateService: InvoiceHasStateService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
        this.principal.identity()
            .then((account) => {
                console.log('Account ', account);
                this.userId = account['id'];
                this.userLogin = account['login'];
            });
    }

    loadAll() {
        if (this.currentSearch) {
            this.invoiceService.search({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()}).subscribe(
                    (res: HttpResponse<Invoice[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.invoiceService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
                (res: HttpResponse<Invoice[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/invoice'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/invoice', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/invoice', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInvoices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Invoice) {
        return item.id;
    }

    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('invoiceListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    pack(invoiceId: number) {
        const invoiceHasState: InvoiceHasState = new InvoiceHasState();
        invoiceHasState.invoiceId = invoiceId;
        invoiceHasState.invoiceState = 3;
        invoiceHasState.userId = this.userId;
        invoiceHasState.userLogin = this.userLogin;
        this.invoiceHasStateService.create(invoiceHasState)
            .subscribe((response) => {
                this.setInvoicesStates();
            });
    }

    setInvoicesStates() {
        this.invoices.forEach((element, index) => {
            this.invoiceHasStateService.findByInvoiceId(element.id)
            .subscribe((response) => {
                element.invoiceStates = response.body;
                let canBePacked: boolean;
                if (response.body.length < 1) {
                    canBePacked = false;
                } else {
                    const lastState = (response.body[response.body.length - 1].invoiceState).toString();
                    canBePacked = (lastState === 'PAID' || lastState === 'NO_PAID') ? true : false;
                }
                element['canBePacked'] = canBePacked;
                console.log(this.invoices);
            });

        });
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.invoices = data;
        this.setInvoicesStates();
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
