import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { JhiLanguageHelper, Principal } from '../../shared';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: [
        'main.component.scss'
    ]
})
export class JhiMainComponent implements OnInit {
    class: any;
    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        public router: Router,
        public principal: Principal
    ) {

    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'delcampoApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (this.router.url === '/register' || this.router.url.substring(0, 13) === '/activate?key'
                || this.router.url === '/reset/request') {
                this.class = 'container-fluid';
            } else {
                this.class = undefined;
            }
            // if(this.principal.isAuthenticated()){
            //   this.router.navigate(['/dashboard']);
            // }
        });

        console.log('full path', this.router.url);
    }

}
