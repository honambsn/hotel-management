import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const api  = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})


export class AccountService {

  constructor(private http:HttpClient) { }

  login(data: any): Observable<any>{
    return this.http.post(api+'account/login', data);
  }
}
