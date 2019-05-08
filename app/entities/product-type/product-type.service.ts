import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductType } from './product-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductType>;

@Injectable()
export class ProductTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/product-types';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/product-types';

    constructor(private http: HttpClient) { }

    create(productType: ProductType): Observable<EntityResponseType> {
        const copy = this.convert(productType);
        return this.http.post<ProductType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(productType: ProductType): Observable<EntityResponseType> {
        const copy = this.convert(productType);
        return this.http.put<ProductType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductType[]>) => this.convertArrayResponse(res));
    }

    findByCategoryId(categoryId: number): Observable<HttpResponse<ProductType[]>> {
      return this.http.get<ProductType[]>(this.resourceUrl + `/findByCategoryId?id=${categoryId}`, { params: {}, observe: 'response' })
          .map((res: HttpResponse<ProductType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ProductType[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductType[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductType[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductType[]>): HttpResponse<ProductType[]> {
        const jsonResponse: ProductType[] = res.body;
        const body: ProductType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductType.
     */
    private convertItemFromServer(productType: ProductType): ProductType {
        const copy: ProductType = Object.assign({}, productType);
        return copy;
    }

    /**
     * Convert a ProductType to a JSON which can be sent to the server.
     */
    private convert(productType: ProductType): ProductType {
        const copy: ProductType = Object.assign({}, productType);
        return copy;
    }
}
