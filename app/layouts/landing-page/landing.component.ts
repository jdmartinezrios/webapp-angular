import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery';
import 'swiper';
import * as WOW from 'wow.js/dist/wow.js';
import { Principal } from '../../shared';

declare var $: any;

@Component({
    selector: 'jhi-landing-page',
    templateUrl: './landing.component.html',
    styleUrls: [
        './landing.component.scss'
    ]
})

export class JhiLandingPageComponent implements OnInit, AfterViewInit {

    constructor(private _elementRef: ElementRef,
                private principal: Principal,
                public router: Router) {
    }

    ngOnInit() {
        if (this.principal.isAuthenticated()) {
            this.router.navigate(['dashboard']);
        }
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scrolltop:hidden').stop(true, true).fadeIn();
            } else {
                $('.scrolltop').stop(true, true).fadeOut();
            }
        });
        $(function() {
            $('.scroll').click(function() {
                $('html,body')
                    .animate({ scrollTop: 0 }, '1000');
                return false;
            });
        });
    }

    ngAfterViewInit() {
        const swiper: any = new Swiper($('.swiper-container'), {
            pagination: '.swiper-pagination',
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            speed: 2000,
            spaceBetween: 0
        });

        new WOW().init();
    }
}
