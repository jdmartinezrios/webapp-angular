import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Zone } from './zone.model';
import { ZonePopupService } from './zone-popup.service';
import { ZoneService } from './zone.service';

@Component({
    selector: 'jhi-zone-delete-dialog',
    templateUrl: './zone-delete-dialog.component.html'
})
export class ZoneDeleteDialogComponent {

    zone: Zone;

    constructor(
        private zoneService: ZoneService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.zoneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'zoneListModification',
                content: 'Deleted an zone'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-zone-delete-popup',
    template: ''
})
export class ZoneDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private zonePopupService: ZonePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.zonePopupService
                .open(ZoneDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
