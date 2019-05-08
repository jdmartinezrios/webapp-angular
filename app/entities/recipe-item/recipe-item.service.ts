import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RecipeItem } from './recipe-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RecipeItem>;

@Injectable()
export class RecipeItemService {

    private resourceUrl =  SERVER_API_URL + 'api/recipe-items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/recipe-items';

    constructor(private http: HttpClient) { }

    create(recipeItem: RecipeItem): Observable<EntityResponseType> {
        const copy = this.convert(recipeItem);
        return this.http.post<RecipeItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(recipeItem: RecipeItem): Observable<EntityResponseType> {
        const copy = this.convert(recipeItem);
        return this.http.put<RecipeItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RecipeItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RecipeItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<RecipeItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RecipeItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<RecipeItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<RecipeItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RecipeItem[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RecipeItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RecipeItem[]>): HttpResponse<RecipeItem[]> {
        const jsonResponse: RecipeItem[] = res.body;
        const body: RecipeItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RecipeItem.
     */
    private convertItemFromServer(recipeItem: RecipeItem): RecipeItem {
        const copy: RecipeItem = Object.assign({}, recipeItem);
        return copy;
    }

    /**
     * Convert a RecipeItem to a JSON which can be sent to the server.
     */
    private convert(recipeItem: RecipeItem): RecipeItem {
        const copy: RecipeItem = Object.assign({}, recipeItem);
        return copy;
    }
}
