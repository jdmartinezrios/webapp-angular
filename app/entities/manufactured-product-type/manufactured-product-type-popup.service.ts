import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ManufacturedProductType } from './manufactured-product-type.model';
import { ManufacturedProductTypeService } from './manufactured-product-type.service';

@Injectable()
export class ManufacturedProductTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private manufacturedProductTypeService: ManufacturedProductTypeService

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
                this.manufacturedProductTypeService.find(id)
                    .subscribe((manufacturedProductTypeResponse: HttpResponse<ManufacturedProductType>) => {
                        const manufacturedProductType: ManufacturedProductType = manufacturedProductTypeResponse.body;
                        this.ngbModalRef = this.manufacturedProductTypeModalRef(component, manufacturedProductType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.manufacturedProductTypeModalRef(component, new ManufacturedProductType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    manufacturedProductTypeModalRef(component: Component, manufacturedProductType: ManufacturedProductType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.manufacturedProductType = manufacturedProductType;
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
