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
  delUser(uid:any):Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);

    return this.http.delete(api+'user/delete/'+uid,httpOptions);
  }
  updateAllUser(data:any):Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    return this.http.patch(api+'user/update/',data,httpOptions);
  }
  genUser():Observable<any>{
    return this.http.post(api+'account/add',"{}");
  }

  addService(user_uid:any,service_uid:any):Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    var path = 'user/detail/'+user_uid +"/" +"bookedservice"
    console.log(api + path + service_uid)
    return this.http.post(api + path,service_uid, httpOptions);
  }
  cancelService(user_uid:any, service_uid:any):Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    var path = 'user/detail/'+user_uid +  "/cancelservice"
    return this.http.post(api + path,service_uid,httpOptions);
  }

  // router.post('/user/detail/:id/bookedroom',userController.add_bookedroom_to_user)
  bookRoom(user_uid:any,data:any):Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    var path = api + 'user/detail/' + user_uid + '/' + 'bookedroom';
    console.log(path)
    console.log(data, httpOptions);
    return this.http.post(path, data, httpOptions);
  }
  cancelRoom(user_uid:any,data:any):Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    var path = api + 'user/detail/' + user_uid + '/' + 'cancelroom';
    console.log(path)
    console.log(data, httpOptions);
    return this.http.post(path, data, httpOptions);
  }
  billAndPoint(uid:any):Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    return this.http.post(api+'user/resetaddpoint',uid,httpOptions);   
  }

  resetRoom(room_id:any):Observable<any>{
    httpOptions.headers =
      httpOptions.headers.set('Authorization', localStorage.getItem('token') as string);
    return this.http.post(api+'user/resetroom',room_id,httpOptions);   
  }
}


