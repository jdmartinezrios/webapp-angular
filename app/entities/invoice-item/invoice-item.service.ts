import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InvoiceItem } from './invoice-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceItem>;

@Injectable()
export class InvoiceItemService {

    private resourceUrl =  SERVER_API_URL + 'api/invoice-items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/invoice-items';

    constructor(private http: HttpClient) { }

    create(invoiceItem: InvoiceItem): Observable<EntityResponseType> {
        const copy = this.convert(invoiceItem);
        return this.http.post<InvoiceItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceItem: InvoiceItem): Observable<EntityResponseType> {
        const copy = this.convert(invoiceItem);
        return this.http.put<InvoiceItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<InvoiceItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceItem[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceItem[]>): HttpResponse<InvoiceItem[]> {
        const jsonResponse: InvoiceItem[] = res.body;
        const body: InvoiceItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceItem.
     */
    private convertItemFromServer(invoiceItem: InvoiceItem): InvoiceItem {
        const copy: InvoiceItem = Object.assign({}, invoiceItem);
        return copy;
    }

    /**
     * Convert a InvoiceItem to a JSON which can be sent to the server.
     */
    private convert(invoiceItem: InvoiceItem): InvoiceItem {
        const copy: InvoiceItem = Object.assign({}, invoiceItem);
        return copy;
    }
}
