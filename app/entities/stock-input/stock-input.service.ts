import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StockInput } from './stock-input.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StockInput>;

@Injectable()
export class StockInputService {

    private resourceUrl =  SERVER_API_URL + 'api/stock-inputs';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stock-inputs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(stockInput: StockInput): Observable<EntityResponseType> {
        const copy = this.convert(stockInput);
        return this.http.post<StockInput>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stockInput: StockInput): Observable<EntityResponseType> {
        const copy = this.convert(stockInput);
        return this.http.put<StockInput>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StockInput>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StockInput[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockInput[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockInput[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StockInput[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockInput[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockInput[]>) => this.convertArrayResponse(res));
    }

    findByProducto(idProducto: any, req?: any): Observable<HttpResponse<StockInput[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockInput[]>(this.resourceUrl + `/findByProduct/${idProducto}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockInput[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StockInput = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StockInput[]>): HttpResponse<StockInput[]> {
        const jsonResponse: StockInput[] = res.body;
        const body: StockInput[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StockInput.
     */
    private convertItemFromServer(stockInput: StockInput): StockInput {
        const copy: StockInput = Object.assign({}, stockInput);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(stockInput.registerDate);
        return copy;
    }

    /**
     * Convert a StockInput to a JSON which can be sent to the server.
     */
    private convert(stockInput: StockInput): StockInput {
        const copy: StockInput = Object.assign({}, stockInput);

        copy.registerDate = this.dateUtils.toDate(stockInput.registerDate);
        return copy;
    }
}
