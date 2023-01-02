import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  title = "Test";
  isAuth: boolean = false;
  post: any;
  room_detail:any;
  roomData : any =[]
  dataSource = new MatTableDataSource <any>(this.roomData);

  constructor(private titleService:Title, private room:RoomService) {
    const token = localStorage.getItem('token');
    if (token) this.isAuth = true;
    else this.isAuth = false;
  }
  
  ngOnInit():void{
    this.titleService.setTitle(this.title); 
    
    //this.getAllRoom()
    console.log('read 1');
    this.getRoomDetail()
  }
  getAllRoom() {
    this.room.getAllRoom().subscribe((res:any)=>{
      this.post = res;
      console.log(this.post);
    })
  }
  getRoomDetail(){
    var uid = '63a993c5f1c8730c9f65d612';
    console.log("read  3")
    this.room.getRoomDetail(uid).subscribe((res:any)=>{
      console.log(Object.values(res));
      this.room_detail = Object.values(res);
      console.log("full data" , this.room_detail);
      console.log(typeof(this.room_detail));
      var tmp = this.room_detail[0];
      console.log(Object.keys(tmp).length);
      console.log(this.room_detail[0].room_img);

    })
  }
  
}
