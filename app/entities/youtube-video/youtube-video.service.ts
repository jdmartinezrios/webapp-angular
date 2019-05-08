import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { YoutubeVideo } from './youtube-video.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<YoutubeVideo>;

@Injectable()
export class YoutubeVideoService {

    private resourceUrl =  SERVER_API_URL + 'api/youtube-videos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/youtube-videos';

    constructor(private http: HttpClient) { }

    create(youtubeVideo: YoutubeVideo): Observable<EntityResponseType> {
        const copy = this.convert(youtubeVideo);
        return this.http.post<YoutubeVideo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(youtubeVideo: YoutubeVideo): Observable<EntityResponseType> {
        const copy = this.convert(youtubeVideo);
        return this.http.put<YoutubeVideo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<YoutubeVideo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<YoutubeVideo[]>> {
        const options = createRequestOption(req);
        return this.http.get<YoutubeVideo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<YoutubeVideo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<YoutubeVideo[]>> {
        const options = createRequestOption(req);
        return this.http.get<YoutubeVideo[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<YoutubeVideo[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: YoutubeVideo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<YoutubeVideo[]>): HttpResponse<YoutubeVideo[]> {
        const jsonResponse: YoutubeVideo[] = res.body;
        const body: YoutubeVideo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to YoutubeVideo.
     */
    private convertItemFromServer(youtubeVideo: YoutubeVideo): YoutubeVideo {
        const copy: YoutubeVideo = Object.assign({}, youtubeVideo);
        return copy;
    }

    /**
     * Convert a YoutubeVideo to a JSON which can be sent to the server.
     */
    private convert(youtubeVideo: YoutubeVideo): YoutubeVideo {
        const copy: YoutubeVideo = Object.assign({}, youtubeVideo);
        return copy;
    }
}
