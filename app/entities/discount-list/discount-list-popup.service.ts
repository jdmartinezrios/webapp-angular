import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DiscountList } from './discount-list.model';
import { DiscountListService } from './discount-list.service';

@Injectable()
export class DiscountListPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private discountListService: DiscountListService

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
                this.discountListService.find(id)
                    .subscribe((discountListResponse: HttpResponse<DiscountList>) => {
                        const discountList: DiscountList = discountListResponse.body;
                        discountList.startDate = this.datePipe
                            .transform(discountList.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        discountList.endDate = this.datePipe
                            .transform(discountList.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.discountListModalRef(component, discountList);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.discountListModalRef(component, new DiscountList());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    discountListModalRef(component: Component, discountList: DiscountList): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.discountList = discountList;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: 'product/' +  discountList.productId + '/edit'}}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: 'product/' +  discountList.productId + '/edit'}}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
