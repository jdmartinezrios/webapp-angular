import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DeliveryRoute } from './delivery-route.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DeliveryRoute>;

@Injectable()
export class DeliveryRouteService {

    private resourceUrl =  SERVER_API_URL + 'api/delivery-routes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/delivery-routes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {}

    create(deliveryRoute: DeliveryRoute): Observable<EntityResponseType> {
        const copy = this.convert(deliveryRoute);
        return this.http.post<DeliveryRoute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(deliveryRoute: DeliveryRoute): Observable<EntityResponseType> {
        const copy = this.convert(deliveryRoute);
        return this.http.put<DeliveryRoute>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DeliveryRoute>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DeliveryRoute[]>> {
        const options = createRequestOption(req);
        return this.http.get<DeliveryRoute[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DeliveryRoute[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<DeliveryRoute[]>> {
        const options = createRequestOption(req);
        return this.http.get<DeliveryRoute[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DeliveryRoute[]>) => this.convertArrayResponse(res));
    }

    findByCurrentUser() {
        return this.http.get<DeliveryRoute[]>(this.resourceUrl + '/findByDriverIsCurrentUser', { observe: 'response' })
            .map((res: HttpResponse<DeliveryRoute[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DeliveryRoute = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DeliveryRoute[]>): HttpResponse<DeliveryRoute[]> {
        const jsonResponse: DeliveryRoute[] = res.body;
        const body: DeliveryRoute[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DeliveryRoute.
     */
    private convertItemFromServer(deliveryRoute: DeliveryRoute): DeliveryRoute {
        const copy: DeliveryRoute = Object.assign({}, deliveryRoute);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(deliveryRoute.createDate);
        copy.scheduleDate = this.dateUtils
            .convertLocalDateFromServer(deliveryRoute.scheduleDate);
        return copy;
    }

    /**
     * Convert a DeliveryRoute to a JSON which can be sent to the server.
     */
    private convert(deliveryRoute: DeliveryRoute): DeliveryRoute {
        const copy: DeliveryRoute = Object.assign({}, deliveryRoute);

        copy.createDate = this.dateUtils.toDate(deliveryRoute.createDate);
        copy.scheduleDate = this.dateUtils
            .convertLocalDateToServer(deliveryRoute.scheduleDate);
        return copy;
    }
}
