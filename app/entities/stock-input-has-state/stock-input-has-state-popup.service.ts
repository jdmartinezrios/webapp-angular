import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { StockInputHasState } from './stock-input-has-state.model';
import { StockInputHasStateService } from './stock-input-has-state.service';

@Injectable()
export class StockInputHasStatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private stockInputHasStateService: StockInputHasStateService

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
                this.stockInputHasStateService.find(id)
                    .subscribe((stockInputHasStateResponse: HttpResponse<StockInputHasState>) => {
                        const stockInputHasState: StockInputHasState = stockInputHasStateResponse.body;
                        stockInputHasState.registerDate = this.datePipe
                            .transform(stockInputHasState.registerDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.stockInputHasStateModalRef(component, stockInputHasState);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stockInputHasStateModalRef(component, new StockInputHasState());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stockInputHasStateModalRef(component: Component, stockInputHasState: StockInputHasState): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stockInputHasState = stockInputHasState;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
