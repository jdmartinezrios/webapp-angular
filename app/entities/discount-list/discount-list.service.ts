import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DiscountList } from './discount-list.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DiscountList>;

@Injectable()
export class DiscountListService {

    private resourceUrl =  SERVER_API_URL + 'api/discount-lists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/discount-lists';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(discountList: DiscountList): Observable<EntityResponseType> {
        const copy = this.convert(discountList);
        return this.http.post<DiscountList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(discountList: DiscountList): Observable<EntityResponseType> {
        const copy = this.convert(discountList);
        return this.http.put<DiscountList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DiscountList>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DiscountList[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiscountList[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiscountList[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DiscountList[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiscountList[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiscountList[]>) => this.convertArrayResponse(res));
    }

    findByProducto(idProducto: any, req?: any): Observable<HttpResponse<DiscountList[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiscountList[]>(this.resourceUrl + `/findByProduct/${idProducto}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiscountList[]>) => this.convertArrayResponse(res, false));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DiscountList = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DiscountList[]>, convertDate?: boolean): HttpResponse<DiscountList[]> {
        const jsonResponse: DiscountList[] = res.body;
        const body: DiscountList[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i], convertDate));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DiscountList.
     */
    private convertItemFromServer(discountList: DiscountList, convertDate?: boolean): DiscountList {
        const copy: DiscountList = Object.assign({}, discountList);

          copy.startDate = this.dateUtils
              .convertDateTimeFromServer(discountList.startDate);
          copy.endDate = this.dateUtils
              .convertDateTimeFromServer(discountList.endDate);
              if (convertDate === false) {
                copy.startDate = this.dateUtils.toDate(discountList.startDate);
                copy.endDate = this.dateUtils.toDate(discountList.endDate);
              }

        return copy;
    }

    /**
     * Convert a DiscountList to a JSON which can be sent to the server.
     */
    private convert(discountList: DiscountList): DiscountList {
        const copy: DiscountList = Object.assign({}, discountList);
        if (typeof copy.startDate === 'string') {
          copy.startDate = this.dateUtils.toDate(discountList.startDate);
        }

        if (typeof copy.endDate === 'string') {
          copy.endDate = this.dateUtils.toDate(discountList.endDate);
        }

        return copy;
    }
}
