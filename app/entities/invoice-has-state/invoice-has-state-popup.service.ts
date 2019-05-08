import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InvoiceHasState } from './invoice-has-state.model';
import { InvoiceHasStateService } from './invoice-has-state.service';

@Injectable()
export class InvoiceHasStatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private invoiceHasStateService: InvoiceHasStateService

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
                this.invoiceHasStateService.find(id)
                    .subscribe((invoiceHasStateResponse: HttpResponse<InvoiceHasState>) => {
                        const invoiceHasState: InvoiceHasState = invoiceHasStateResponse.body;
                        invoiceHasState.registerDate = this.datePipe
                            .transform(invoiceHasState.registerDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.invoiceHasStateModalRef(component, invoiceHasState);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceHasStateModalRef(component, new InvoiceHasState());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceHasStateModalRef(component: Component, invoiceHasState: InvoiceHasState): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.invoiceHasState = invoiceHasState;
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
