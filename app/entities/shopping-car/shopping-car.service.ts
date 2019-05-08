import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ShoppingCar } from './shopping-car.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ShoppingCar>;

@Injectable()
export class ShoppingCarService {

    private resourceUrl =  SERVER_API_URL + 'api/shopping-cars';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/shopping-cars';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(shoppingCar: ShoppingCar): Observable<EntityResponseType> {
        const copy = this.convert(shoppingCar);
        return this.http.post<ShoppingCar>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(shoppingCar: ShoppingCar): Observable<EntityResponseType> {
        const copy = this.convert(shoppingCar);
        return this.http.put<ShoppingCar>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ShoppingCar>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ShoppingCar[]>> {
        const options = createRequestOption(req);
        return this.http.get<ShoppingCar[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ShoppingCar[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ShoppingCar[]>> {
        const options = createRequestOption(req);
        return this.http.get<ShoppingCar[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ShoppingCar[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ShoppingCar = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ShoppingCar[]>): HttpResponse<ShoppingCar[]> {
        const jsonResponse: ShoppingCar[] = res.body;
        const body: ShoppingCar[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ShoppingCar.
     */
    private convertItemFromServer(shoppingCar: ShoppingCar): ShoppingCar {
        const copy: ShoppingCar = Object.assign({}, shoppingCar);
        copy.addDate = this.dateUtils
            .convertDateTimeFromServer(shoppingCar.addDate);
        return copy;
    }

    /**
     * Convert a ShoppingCar to a JSON which can be sent to the server.
     */
    private convert(shoppingCar: ShoppingCar): ShoppingCar {
        const copy: ShoppingCar = Object.assign({}, shoppingCar);

        copy.addDate = this.dateUtils.toDate(shoppingCar.addDate);
        return copy;
    }
}
