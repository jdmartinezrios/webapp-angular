import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { YoutubeVideo } from './youtube-video.model';
import { YoutubeVideoService } from './youtube-video.service';

@Injectable()
export class YoutubeVideoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private youtubeVideoService: YoutubeVideoService

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
                this.youtubeVideoService.find(id)
                    .subscribe((youtubeVideoResponse: HttpResponse<YoutubeVideo>) => {
                        const youtubeVideo: YoutubeVideo = youtubeVideoResponse.body;
                        this.ngbModalRef = this.youtubeVideoModalRef(component, youtubeVideo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.youtubeVideoModalRef(component, new YoutubeVideo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    youtubeVideoModalRef(component: Component, youtubeVideo: YoutubeVideo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.youtubeVideo = youtubeVideo;
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
