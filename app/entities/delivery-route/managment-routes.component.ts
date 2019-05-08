import { Component, OnInit } from '@angular/core';
import { DeliveryRouteService } from './delivery-route.service';
import { DeliveryRoute } from './delivery-route.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../invoice/invoice.model';
import { InvoiceHasState } from '../invoice-has-state/invoice-has-state.model';
import { InvoiceHasStateService } from '../invoice-has-state/invoice-has-state.service';

import { Principal } from '../../shared/auth/principal.service';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-managment-routes',
    templateUrl: './managment-routes.component.html'
})
export class ManagmentRoutesComponent implements OnInit {

	deliveryRoutes: DeliveryRoute[];
	deliveryRouteToEdit: DeliveryRoute;
	invoiceHasStates: InvoiceHasState[] = [];
	userId: number;

	constructor(private deliveryRouteService: DeliveryRouteService,
				private principal: Principal,
				private jhiAlertService: JhiAlertService,
				private eventManager: JhiEventManager,
				private invoiceHasStateService: InvoiceHasStateService) {

	}

	ngOnInit() {
		this.getMyAssignedRoutes();
		this.principal.identity()
		.then((account) => {
			this.userId = account['id'];
		});
	}

	getMyAssignedRoutes() {
		this.deliveryRouteService.findByCurrentUser()
		.subscribe((response: HttpResponse<DeliveryRoute[]>) => {
			this.deliveryRoutes = response.body;
			console.log('Este es el resultado de la consulta ', this.deliveryRoutes)
		}, (response: HttpErrorResponse) => {
			console.error(response);
		});
	}

	setDeliveredRouteToEdit(shipment: Invoice) {
		this.deliveryRouteToEdit = shipment;
		this.invoiceHasStates = [];
		this.deliveryRouteToEdit.shipments.forEach((e) => {
			const ihs: InvoiceHasState = new InvoiceHasState();
			ihs.invoiceId = e.id;
			ihs.invoiceState = null;
			ihs.userId = this.userId;
			this.invoiceHasStates.push(ihs);
		});
		this.setInvoicesStates();
	}

	setInvoicesStates() {
        this.deliveryRouteToEdit.shipments.forEach((element, index) => {
            this.invoiceHasStateService.findByInvoiceId(element.id)
            .subscribe((response) => {
                element["invoiceStates"] = response.body;
            });
        });
    }

	updateShipmentState(index: number) {
		// console.log(this.invoiceHasStates);
		this.subscribeToSaveResponse(
                this.invoiceHasStateService.create(this.invoiceHasStates[index]));
	}

	private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceHasState>>) {
        result.subscribe((res: HttpResponse<InvoiceHasState>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InvoiceHasState) {
        this.eventManager.broadcast({ name: 'invoiceHasStateListModification', content: 'OK'});
        this.setInvoicesStates();
    }

    private onSaveError() {
        console.log('Error al actualizar el estado');
    }
}