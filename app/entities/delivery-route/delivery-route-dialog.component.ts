import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DeliveryRoute } from './delivery-route.model';
import { DeliveryRoutePopupService } from './delivery-route-popup.service';
import { DeliveryRouteService } from './delivery-route.service';
import { Vehicle, VehicleService } from '../vehicle';
import { User, UserService } from '../../shared';
import { Invoice, InvoiceService } from '../invoice';
import { InvoiceHasStateService } from '../invoice-has-state/invoice-has-state.service';
import { InvoiceHasState } from '../invoice-has-state/invoice-has-state.model';
import { Principal } from '../../shared/auth/principal.service';

@Component({
    selector: 'jhi-delivery-route-dialog',
    templateUrl: './delivery-route-dialog.component.html'
})
export class DeliveryRouteDialogComponent implements OnInit {

    deliveryRoute: DeliveryRoute;
    isSaving: boolean;

    vehicles: Vehicle[];

    users: User[];
    driver: User;
    invoices: Invoice[];
    scheduleDateDp: any;
    userId: number;
    savedShipments: Invoice[] = [];
    shipmentsToRemove: Invoice[] = [];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private deliveryRouteService: DeliveryRouteService,
        private vehicleService: VehicleService,
        private userService: UserService,
        private invoiceService: InvoiceService,
        private eventManager: JhiEventManager,
        private invoiceHasStateService: InvoiceHasStateService,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        if (!this.deliveryRoute.id) {
            this.deliveryRoute.shipments = [];
        } else {
            this.savedShipments = JSON.parse(JSON.stringify(this.deliveryRoute.shipments));
            this.userService.find(this.deliveryRoute.driverLogin)
                .subscribe((res: HttpResponse<User>) => {
                    this.driver = res.body;
                });
        }
        console.log('La ruta ', this.deliveryRoute);
        this.principal.identity()
            .then((account) => {
                this.userId = account['id'];
            });
        this.isSaving = false;
        this.vehicleService.query()
            .subscribe((res: HttpResponse<Vehicle[]>) => { this.vehicles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.getInvoices();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    getInvoices() {
        this.invoiceService.findInvoicesToSend()
            .subscribe((res: HttpResponse<Invoice[]>) => { this.invoices = res.body;
            this.invoices = this.invoices.concat(this.deliveryRoute.shipments.filter((e) => {
                let val = true;
                this.invoices.forEach((element) =>  {
                    if (e.id == element.id) {
                        val = false;
                    }
                });
                return val; 
            }));
            this.setInvoicesStates();
         }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    save() {
        this.isSaving = true;
        if (this.deliveryRoute.id !== undefined) {
            this.subscribeToSaveResponse(
                this.deliveryRouteService.update(this.deliveryRoute));
        } else {
            this.deliveryRoute.driverId = this.driver.id;
            console.log(this.deliveryRoute);
            this.subscribeToSaveResponse(
                this.deliveryRouteService.create(this.deliveryRoute));
        }
    }

    buscarUsuarios(data) {
        if (this.driver !== undefined) {
            // console.log('Esta definido ', this.driver)
            this.driver = undefined;
            // console.log('Se indefinio ', this.driver);
        }
        this.userService.findByEmail(data.query)
        .subscribe((res) => {
            this.users = res.body;
        });
    }

    addInvoice(invoice: Invoice) {
        let index = undefined;
        this.deliveryRoute.shipments.forEach((element, i) => {
            if (element.id === invoice.id) {
                index = i;
            }
        });

        if (index !== undefined) {
            this.deliveryRoute.shipments.splice(index, 1);
            if (this.deliveryRoute.id) {
                this.checkAdd(invoice.id, false);
            }
        } else {
            this.deliveryRoute.shipments.push(invoice);
            if (this.deliveryRoute.id) {
                this.checkAdd(invoice.id, true);
            }
        }
    }

    checkAdd(id: number, add: boolean) {
        if (add) {
            let index;
            this.shipmentsToRemove.forEach((e, i) => {
                if (id === e.id) {
                    index = i;
                }
            });
            if (index) {
                this.shipmentsToRemove.splice(index, 1);
            }
        } else {
            this.savedShipments.forEach((e) => {
                if (e.id === id) {
                    const shipment = Object.assign({}, e);
                    this.shipmentsToRemove.push(shipment);
                }
            });
        }
    }

    removeShipments(userId: number) {
        this.shipmentsToRemove.forEach((e) => {
            const shs: InvoiceHasState = new InvoiceHasState();
            shs.invoiceId = e.id;
            shs.userId = userId;
            shs.invoiceState = 6;
            this.invoiceHasStateService.create(shs)
            .subscribe((res) => {
                console.log('Nuevo estado ', res.body);
            });
        });
    }

    shipmenIsAdded(invoice: Invoice) {
        let val = false;
        if (this.deliveryRoute.shipments) {
            this.deliveryRoute.shipments.forEach((e) => {
                if (e.id === invoice.id) {
                    val = true;
                }
            });
        }
        return val;
    }

    setInvoicesStates() {
        this.invoices.forEach((element, index) => {
            this.invoiceHasStateService.findByInvoiceId(element.id)
            .subscribe((response) => {
                element.invoiceStates = response.body;
            });

        });
    }

    setInvoicesStateProgramed(invoices: Invoice[]) {
        this.invoices.filter((element) => { return (element.invoiceStates[element.invoiceStates.length - 1]['invoiceState']).toString() !== 'IN_TRANSIT'; }).forEach((invoice) => {
            const invoiceHasState: InvoiceHasState = new InvoiceHasState();
            invoiceHasState.invoiceId = invoice.id;
            invoiceHasState.invoiceState = 4;
            invoiceHasState.userId = this.userId;
            invoices.forEach((e) => {
                if (e.id === invoice.id) {
                    this.invoiceHasStateService.create(invoiceHasState)
                        .subscribe((res: HttpResponse<InvoiceHasState>) => {
                            console.log('Nuevo estado estado ', res.body);
                        });
                }
            });
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DeliveryRoute>>) {
        result.subscribe((res: HttpResponse<DeliveryRoute>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DeliveryRoute) {
        this.setInvoicesStateProgramed(result.shipments);
        this.eventManager.broadcast({ name: 'deliveryRouteListModification', content: 'OK'});
        this.isSaving = false;
        this.removeShipments(this.userId);
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVehicleById(index: number, item: Vehicle) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackInvoiceById(index: number, item: Invoice) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-delivery-route-popup',
    template: ''
})
export class DeliveryRoutePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private deliveryRoutePopupService: DeliveryRoutePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.deliveryRoutePopupService
                    .open(DeliveryRouteDialogComponent as Component, params['id']);
            } else {
                this.deliveryRoutePopupService
                    .open(DeliveryRouteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
