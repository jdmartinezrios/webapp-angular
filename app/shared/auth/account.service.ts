import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

@Injectable()
export class AccountService  {
    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    get(): Observable<HttpResponse<Account>> {
        return this.http.get<Account>(SERVER_API_URL + 'api/account', {observe : 'response'});
    }

    save(account: any): Observable<HttpResponse<any>> {
        account.birthdate = this.dateUtils
            .convertLocalDateToServer(account.birthdate);
        return this.http.post(SERVER_API_URL + 'api/account', account, {observe: 'response'});
    }
}
