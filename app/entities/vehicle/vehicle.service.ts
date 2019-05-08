import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Vehicle } from './vehicle.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Vehicle>;

@Injectable()
export class VehicleService {

    private resourceUrl =  SERVER_API_URL + 'api/vehicles';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/vehicles';

    constructor(private http: HttpClient) { }

    create(vehicle: Vehicle): Observable<EntityResponseType> {
        const copy = this.convert(vehicle);
        return this.http.post<Vehicle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicle: Vehicle): Observable<EntityResponseType> {
        const copy = this.convert(vehicle);
        return this.http.put<Vehicle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Vehicle>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Vehicle[]>> {
        const options = createRequestOption(req);
        return this.http.get<Vehicle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Vehicle[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Vehicle[]>> {
        const options = createRequestOption(req);
        return this.http.get<Vehicle[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Vehicle[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Vehicle = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Vehicle[]>): HttpResponse<Vehicle[]> {
        const jsonResponse: Vehicle[] = res.body;
        const body: Vehicle[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Vehicle.
     */
    private convertItemFromServer(vehicle: Vehicle): Vehicle {
        const copy: Vehicle = Object.assign({}, vehicle);
        return copy;
    }

    /**
     * Convert a Vehicle to a JSON which can be sent to the server.
     */
    private convert(vehicle: Vehicle): Vehicle {
        const copy: Vehicle = Object.assign({}, vehicle);
        return copy;
    }
}
