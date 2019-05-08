import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InvoiceHasState } from './invoice-has-state.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceHasState>;

@Injectable()
export class InvoiceHasStateService {

    private resourceUrl =  SERVER_API_URL + 'api/invoice-has-states';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/invoice-has-states';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(invoiceHasState: InvoiceHasState): Observable<EntityResponseType> {
        const copy = this.convert(invoiceHasState);
        return this.http.post<InvoiceHasState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceHasState: InvoiceHasState): Observable<EntityResponseType> {
        const copy = this.convert(invoiceHasState);
        return this.http.put<InvoiceHasState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceHasState>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceHasState[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceHasState[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceHasState[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<InvoiceHasState[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceHasState[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceHasState[]>) => this.convertArrayResponse(res));
    }

    findByInvoiceId(invoiceId: number) {
        return this.http.get<InvoiceHasState[]>(this.resourceUrl + `/findByInvoiceId?invoiceId=${invoiceId}`, { observe: 'response' })
            .map((res: HttpResponse<InvoiceHasState[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceHasState = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceHasState[]>): HttpResponse<InvoiceHasState[]> {
        const jsonResponse: InvoiceHasState[] = res.body;
        const body: InvoiceHasState[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceHasState.
     */
    private convertItemFromServer(invoiceHasState: InvoiceHasState): InvoiceHasState {
        const copy: InvoiceHasState = Object.assign({}, invoiceHasState);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(invoiceHasState.registerDate);
        return copy;
    }

    /**
     * Convert a InvoiceHasState to a JSON which can be sent to the server.
     */
    private convert(invoiceHasState: InvoiceHasState): InvoiceHasState {
        const copy: InvoiceHasState = Object.assign({}, invoiceHasState);

        copy.registerDate = this.dateUtils.toDate(invoiceHasState.registerDate);
        return copy;
    }
}
