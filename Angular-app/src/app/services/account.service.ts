import { Observable } from 'rxjs';
import { Account } from './../models/account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {

   }
   insertAccount(acc:Account): Observable<Account> {
    return this.http.post<Account>('http://localhost:8000/api/insert', Account);
}
}
