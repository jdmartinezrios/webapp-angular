import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ManufacturedProductType } from './manufactured-product-type.model';
import { ManufacturedProductTypePopupService } from './manufactured-product-type-popup.service';
import { ManufacturedProductTypeService } from './manufactured-product-type.service';

@Component({
    selector: 'jhi-manufactured-product-type-delete-dialog',
    templateUrl: './manufactured-product-type-delete-dialog.component.html'
})
export class ManufacturedProductTypeDeleteDialogComponent {

    manufacturedProductType: ManufacturedProductType;

    constructor(
        private manufacturedProductTypeService: ManufacturedProductTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.manufacturedProductTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'manufacturedProductTypeListModification',
                content: 'Deleted an manufacturedProductType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-manufactured-product-type-delete-popup',
    template: ''
})
export class ManufacturedProductTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private manufacturedProductTypePopupService: ManufacturedProductTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.manufacturedProductTypePopupService
                .open(ManufacturedProductTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
