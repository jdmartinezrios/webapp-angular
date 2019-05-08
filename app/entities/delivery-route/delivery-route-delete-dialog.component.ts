import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DeliveryRoute } from './delivery-route.model';
import { DeliveryRoutePopupService } from './delivery-route-popup.service';
import { DeliveryRouteService } from './delivery-route.service';

@Component({
    selector: 'jhi-delivery-route-delete-dialog',
    templateUrl: './delivery-route-delete-dialog.component.html'
})
export class DeliveryRouteDeleteDialogComponent {

    deliveryRoute: DeliveryRoute;

    constructor(
        private deliveryRouteService: DeliveryRouteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryRouteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'deliveryRouteListModification',
                content: 'Deleted an deliveryRoute'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-route-delete-popup',
    template: ''
})
export class DeliveryRouteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private deliveryRoutePopupService: DeliveryRoutePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.deliveryRoutePopupService
                .open(DeliveryRouteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
