import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DeliveryRoute } from './delivery-route.model';
import { DeliveryRouteService } from './delivery-route.service';

@Injectable()
export class DeliveryRoutePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private deliveryRouteService: DeliveryRouteService

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
                this.deliveryRouteService.find(id)
                    .subscribe((deliveryRouteResponse: HttpResponse<DeliveryRoute>) => {
                        const deliveryRoute: DeliveryRoute = deliveryRouteResponse.body;
                        deliveryRoute.createDate = this.datePipe
                            .transform(deliveryRoute.createDate, 'yyyy-MM-ddTHH:mm:ss');
                        if (deliveryRoute.scheduleDate) {
                            deliveryRoute.scheduleDate = {
                                year: deliveryRoute.scheduleDate.getFullYear(),
                                month: deliveryRoute.scheduleDate.getMonth() + 1,
                                day: deliveryRoute.scheduleDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.deliveryRouteModalRef(component, deliveryRoute);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.deliveryRouteModalRef(component, new DeliveryRoute());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    deliveryRouteModalRef(component: Component, deliveryRoute: DeliveryRoute): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.deliveryRoute = deliveryRoute;
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
