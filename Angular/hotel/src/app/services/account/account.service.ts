import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

 const httpOptions = {
  headers: new HttpHeaders
};
const api  = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})


export class AccountService {

  constructor(private http:HttpClient) { }

  login(data: any): Observable<any>{
    console.log(api+' account/login ', data)
    return this.http.post(api+'account/login', data);
  }

  signup(data: any): Observable<any>{
    console.log(api+'account/add', data)
    return this.http.post(api+'account/add', data);
  }
  getInfo(uid:any):Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    return this.http.get(api+'user/detail/'+uid,httpOptions);
  }
  updateInfo(uid:any,data:any):Observable<any>{
    return this.http.patch(api+'user/update/'+uid,data,httpOptions);
  }
  getAllInfo():Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    return this.http.get(api+'user/list/',httpOptions);
  }

}


