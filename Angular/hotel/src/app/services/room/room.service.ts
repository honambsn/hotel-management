import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions={
  headers: new HttpHeaders
}

const api  = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})


export class RoomService {

  constructor(private http:HttpClient) { }

  getAllRoom() : Observable<any> {
    console.log(api + 'room/list')
    return this.http.get(api + 'room/list');
  }
  getRoomDetail(uid:any):Observable<any> {
    httpOptions.headers = 
      httpOptions.headers.set('Authorization',localStorage.getItem('token') as string);
    console.log(api + 'room/detail/' + uid);
    console.log("got")
    return this.http.get(api + 'room/detail/' +uid, httpOptions);
  }

}
