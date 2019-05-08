import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PriceList } from './price-list.model';
import { PriceListService } from './price-list.service';

@Injectable()
export class PriceListPopupService {
    private ngbModalRef: NgbModalRef;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private priceListService: PriceListService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.priceListService.find(id)
                    .subscribe((priceListResponse: HttpResponse<PriceList>) => {
                        const priceList: PriceList = priceListResponse.body;
                        priceList.startDate = this.datePipe
                            .transform(priceList.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        priceList.endDate = this.datePipe
                            .transform(priceList.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.priceListModalRef(component, priceList);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.priceListModalRef(component, new PriceList());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    priceListModalRef(component: Component, priceList: PriceList): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.priceList = priceList;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: 'product/' + priceList.productId + '/edit'}}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: 'product/' +  priceList.productId + '/edit'}}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
