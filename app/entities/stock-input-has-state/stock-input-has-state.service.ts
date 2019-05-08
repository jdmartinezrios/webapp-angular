import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StockInputHasState } from './stock-input-has-state.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StockInputHasState>;

@Injectable()
export class StockInputHasStateService {

    private resourceUrl =  SERVER_API_URL + 'api/stock-input-has-states';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/stock-input-has-states';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(stockInputHasState: StockInputHasState): Observable<EntityResponseType> {
        const copy = this.convert(stockInputHasState);
        return this.http.post<StockInputHasState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stockInputHasState: StockInputHasState): Observable<EntityResponseType> {
        const copy = this.convert(stockInputHasState);
        return this.http.put<StockInputHasState>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StockInputHasState>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StockInputHasState[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockInputHasState[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockInputHasState[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StockInputHasState[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockInputHasState[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockInputHasState[]>) => this.convertArrayResponse(res));
    }

    findByStockInput(stockInpuId: any, req?: any): Observable<HttpResponse<StockInputHasState[]>> {
        const options = createRequestOption(req);
        return this.http.get<StockInputHasState[]>(this.resourceUrl + `/findByStockInput/${stockInpuId}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<StockInputHasState[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StockInputHasState = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StockInputHasState[]>): HttpResponse<StockInputHasState[]> {
        const jsonResponse: StockInputHasState[] = res.body;
        const body: StockInputHasState[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StockInputHasState.
     */
    private convertItemFromServer(stockInputHasState: StockInputHasState): StockInputHasState {
        const copy: StockInputHasState = Object.assign({}, stockInputHasState);
        copy.registerDate = this.dateUtils
            .convertDateTimeFromServer(stockInputHasState.registerDate);
        return copy;
    }

    /**
     * Convert a StockInputHasState to a JSON which can be sent to the server.
     */
    private convert(stockInputHasState: StockInputHasState): StockInputHasState {
        const copy: StockInputHasState = Object.assign({}, stockInputHasState);

        copy.registerDate = this.dateUtils.toDate(stockInputHasState.registerDate);
        return copy;
    }
}
