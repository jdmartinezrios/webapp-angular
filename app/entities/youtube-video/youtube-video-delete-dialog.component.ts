import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { YoutubeVideo } from './youtube-video.model';
import { YoutubeVideoPopupService } from './youtube-video-popup.service';
import { YoutubeVideoService } from './youtube-video.service';

@Component({
    selector: 'jhi-youtube-video-delete-dialog',
    templateUrl: './youtube-video-delete-dialog.component.html'
})
export class YoutubeVideoDeleteDialogComponent {

    youtubeVideo: YoutubeVideo;

    constructor(
        private youtubeVideoService: YoutubeVideoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.youtubeVideoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'youtubeVideoListModification',
                content: 'Deleted an youtubeVideo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-youtube-video-delete-popup',
    template: ''
})
export class YoutubeVideoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private youtubeVideoPopupService: YoutubeVideoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.youtubeVideoPopupService
                .open(YoutubeVideoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
