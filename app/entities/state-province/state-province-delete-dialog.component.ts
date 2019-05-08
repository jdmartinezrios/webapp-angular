import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StateProvince } from './state-province.model';
import { StateProvincePopupService } from './state-province-popup.service';
import { StateProvinceService } from './state-province.service';

@Component({
    selector: 'jhi-state-province-delete-dialog',
    templateUrl: './state-province-delete-dialog.component.html'
})
export class StateProvinceDeleteDialogComponent {

    stateProvince: StateProvince;

    constructor(
        private stateProvinceService: StateProvinceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stateProvinceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stateProvinceListModification',
                content: 'Deleted an stateProvince'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-state-province-delete-popup',
    template: ''
})
export class StateProvinceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stateProvincePopupService: StateProvincePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stateProvincePopupService
                .open(StateProvinceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
