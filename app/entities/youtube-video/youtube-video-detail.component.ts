import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { YoutubeVideo } from './youtube-video.model';
import { YoutubeVideoService } from './youtube-video.service';

@Component({
    selector: 'jhi-youtube-video-detail',
    templateUrl: './youtube-video-detail.component.html'
})
export class YoutubeVideoDetailComponent implements OnInit, OnDestroy {

    youtubeVideo: YoutubeVideo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private youtubeVideoService: YoutubeVideoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInYoutubeVideos();
    }

    load(id) {
        this.youtubeVideoService.find(id)
            .subscribe((youtubeVideoResponse: HttpResponse<YoutubeVideo>) => {
                this.youtubeVideo = youtubeVideoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInYoutubeVideos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'youtubeVideoListModification',
            (response) => this.load(this.youtubeVideo.id)
        );
    }
}
