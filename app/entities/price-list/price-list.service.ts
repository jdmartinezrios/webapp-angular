import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PriceList } from './price-list.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PriceList>;

@Injectable()
export class PriceListService {

    private resourceUrl =  SERVER_API_URL + 'api/price-lists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/price-lists';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(priceList: PriceList): Observable<EntityResponseType> {
        const copy = this.convert(priceList);
        return this.http.post<PriceList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(priceList: PriceList): Observable<EntityResponseType> {
        const copy = this.convert(priceList);
        return this.http.put<PriceList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PriceList>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PriceList[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceList[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceList[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PriceList[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceList[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceList[]>) => this.convertArrayResponse(res));
    }

    findByProducto(idProducto: any, req?: any): Observable<HttpResponse<PriceList[]>> {
        const options = createRequestOption(req);
        return this.http.get<PriceList[]>(this.resourceUrl + `/findByProduct/${idProducto}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<PriceList[]>) => this.convertArrayResponse(res, false));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PriceList = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PriceList[]>, convertDate?: boolean): HttpResponse<PriceList[]> {
        const jsonResponse: PriceList[] = res.body;
        const body: PriceList[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i], convertDate));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PriceList.
     */
    private convertItemFromServer(priceList: PriceList, convertDate?: boolean): PriceList {
        const copy: PriceList = Object.assign({}, priceList);
        console.log(copy);

          console.log('SE convirtio con ', convertDate);
          copy.startDate = this.dateUtils
              .convertDateTimeFromServer(priceList.startDate);
          copy.endDate = this.dateUtils
              .convertDateTimeFromServer(priceList.endDate);
        if (convertDate === false) {
          copy.startDate = this.dateUtils.toDate(priceList.startDate);
          copy.endDate = this.dateUtils.toDate(priceList.endDate);
        }

        return copy;
    }

    /**
     * Convert a PriceList to a JSON which can be sent to the server.
     */
    private convert(priceList: PriceList): PriceList {
        const copy: PriceList = Object.assign({}, priceList);
        if (typeof copy.startDate === 'string') {
          copy.startDate = this.dateUtils.toDate(priceList.startDate);
        }

        if (typeof copy.startDate === 'string') {
          copy.endDate = this.dateUtils.toDate(priceList.endDate);
        }

        return copy;
    }
}
