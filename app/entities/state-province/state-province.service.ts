import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StateProvince } from './state-province.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StateProvince>;

@Injectable()
export class StateProvinceService {

    private resourceUrl =  SERVER_API_URL + 'api/state-provinces';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/state-provinces';

    constructor(private http: HttpClient) { }

    create(stateProvince: StateProvince): Observable<EntityResponseType> {
        const copy = this.convert(stateProvince);
        return this.http.post<StateProvince>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stateProvince: StateProvince): Observable<EntityResponseType> {
        const copy = this.convert(stateProvince);
        return this.http.put<StateProvince>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StateProvince>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StateProvince[]>> {
        const options = createRequestOption(req);
        return this.http.get<StateProvince[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StateProvince[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StateProvince[]>> {
        const options = createRequestOption(req);
        return this.http.get<StateProvince[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StateProvince[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StateProvince = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StateProvince[]>): HttpResponse<StateProvince[]> {
        const jsonResponse: StateProvince[] = res.body;
        const body: StateProvince[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StateProvince.
     */
    private convertItemFromServer(stateProvince: StateProvince): StateProvince {
        const copy: StateProvince = Object.assign({}, stateProvince);
        return copy;
    }

    /**
     * Convert a StateProvince to a JSON which can be sent to the server.
     */
    private convert(stateProvince: StateProvince): StateProvince {
        const copy: StateProvince = Object.assign({}, stateProvince);
        return copy;
    }
}
