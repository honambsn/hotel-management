import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';



const httpOptions={
  headers: new HttpHeaders
}

const api  = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  getAllService() : Observable<any> {
    console.log(api + 'service/list')


    httpOptions.headers =
      httpOptions.headers.set('Authorization',localStorage.getItem('token') as string);
    return this.http.get(api + 'service/list', httpOptions);
  }

  getServiceInfo(serviceId:any) : Observable<any> {

    httpOptions.headers =

    httpOptions.headers.set('Authorization',localStorage.getItem('token') as string);
  return this.http.get(api + 'service/detail/' + serviceId, httpOptions);

  }
  addService(data:any):Observable<any>{

    httpOptions.headers =
    httpOptions.headers.set('Authorization',localStorage.getItem('token') as string);
    return this.http.post(api + 'service/add',data, httpOptions);
  }
  deleteService(uid:any):Observable<any>{
    httpOptions.headers =
    httpOptions.headers.set('Authorization',localStorage.getItem('token') as string);
    return this.http.delete(api + 'service/delete/' + uid, httpOptions);
  }
  updateSpecificService(uid:any,data:any):Observable<any>{
    httpOptions.headers =
    httpOptions.headers.set('Authorization',localStorage.getItem('token') as string);
  return this.http.patch(api + 'service/detail/' + uid,data, httpOptions);

  }
  updateAllService(data:any):Observable<any>{
    httpOptions.headers =

}
