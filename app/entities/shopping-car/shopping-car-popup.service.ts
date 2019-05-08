import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ShoppingCar } from './shopping-car.model';
import { ShoppingCarService } from './shopping-car.service';

@Injectable()
export class ShoppingCarPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private shoppingCarService: ShoppingCarService

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
                this.shoppingCarService.find(id)
                    .subscribe((shoppingCarResponse: HttpResponse<ShoppingCar>) => {
                        const shoppingCar: ShoppingCar = shoppingCarResponse.body;
                        shoppingCar.addDate = this.datePipe
                            .transform(shoppingCar.addDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.shoppingCarModalRef(component, shoppingCar);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.shoppingCarModalRef(component, new ShoppingCar());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    shoppingCarModalRef(component: Component, shoppingCar: ShoppingCar): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.shoppingCar = shoppingCar;
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
