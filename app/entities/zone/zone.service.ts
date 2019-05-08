import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Zone } from './zone.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Zone>;

@Injectable()
export class ZoneService {

    private resourceUrl =  SERVER_API_URL + 'api/zones';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/zones';

    constructor(private http: HttpClient) { }

    create(zone: Zone): Observable<EntityResponseType> {
        const copy = this.convert(zone);
        return this.http.post<Zone>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(zone: Zone): Observable<EntityResponseType> {
        const copy = this.convert(zone);
        return this.http.put<Zone>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Zone>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Zone[]>> {
        const options = createRequestOption(req);
        return this.http.get<Zone[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Zone[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Zone[]>> {
        const options = createRequestOption(req);
        return this.http.get<Zone[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Zone[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Zone = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Zone[]>): HttpResponse<Zone[]> {
        const jsonResponse: Zone[] = res.body;
        const body: Zone[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Zone.
     */
    private convertItemFromServer(zone: Zone): Zone {
        const copy: Zone = Object.assign({}, zone);
        return copy;
    }

    /**
     * Convert a Zone to a JSON which can be sent to the server.
     */
    private convert(zone: Zone): Zone {
        const copy: Zone = Object.assign({}, zone);
        return copy;
    }
}
