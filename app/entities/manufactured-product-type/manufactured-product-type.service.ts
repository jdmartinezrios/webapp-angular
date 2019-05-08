import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ManufacturedProductType } from './manufactured-product-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ManufacturedProductType>;

@Injectable()
export class ManufacturedProductTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/manufactured-product-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/manufactured-product-types';

    constructor(private http: HttpClient) { }

    create(manufacturedProductType: ManufacturedProductType): Observable<EntityResponseType> {
        const copy = this.convert(manufacturedProductType);
        return this.http.post<ManufacturedProductType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(manufacturedProductType: ManufacturedProductType): Observable<EntityResponseType> {
        const copy = this.convert(manufacturedProductType);
        return this.http.put<ManufacturedProductType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ManufacturedProductType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ManufacturedProductType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ManufacturedProductType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ManufacturedProductType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ManufacturedProductType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ManufacturedProductType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ManufacturedProductType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ManufacturedProductType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ManufacturedProductType[]>): HttpResponse<ManufacturedProductType[]> {
        const jsonResponse: ManufacturedProductType[] = res.body;
        const body: ManufacturedProductType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ManufacturedProductType.
     */
    private convertItemFromServer(manufacturedProductType: ManufacturedProductType): ManufacturedProductType {
        const copy: ManufacturedProductType = Object.assign({}, manufacturedProductType);
        return copy;
    }

    /**
     * Convert a ManufacturedProductType to a JSON which can be sent to the server.
     */
    private convert(manufacturedProductType: ManufacturedProductType): ManufacturedProductType {
        const copy: ManufacturedProductType = Object.assign({}, manufacturedProductType);
        return copy;
    }
}
