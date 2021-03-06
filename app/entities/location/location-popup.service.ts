import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Location } from './location.model';
import { LocationService } from './location.service';

@Injectable()
export class LocationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private locationService: LocationService

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
                this.locationService.find(id)
                    .subscribe((locationResponse: HttpResponse<Location>) => {
                        const location: Location = locationResponse.body;
                        this.ngbModalRef = this.locationModalRef(component, location);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.locationModalRef(component, new Location());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    locationModalRef(component: Component, location: any): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});

        const userLogin = localStorage.getItem('userLogin');
        modalRef.componentInstance.location = location;
        modalRef.result.then((result) => {

            if (this.router.url.includes('user-management')) {
                this.router.navigate([{ outlets: { popup: 'user-management/' + userLogin + '/edit' }}], { replaceUrl: true, queryParamsHandling: 'merge' });

            } else {
                this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });

            }
            this.ngbModalRef = null;
        }, (reason) => {

            if (this.router.url.includes('user-management')) {
                this.router.navigate([{ outlets: { popup: 'user-management/' + userLogin + '/edit' }}], { replaceUrl: true, queryParamsHandling: 'merge' });

            } else {
                this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });

            }
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
