import { Router } from '@angular/router';
import { RoomService } from './../../../services/room/room.service';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-roominfo',
  templateUrl: './roominfo.component.html',
  styleUrls: ['./roominfo.component.css']
})
export class RoominfoComponent {
  title = "Room info";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false;
  uid: any;

  id:any;
  room_no:any;
  room_type:any;
  price:any;
  room_status:any;
  clean_status:any;

  edit:boolean = false;

  roomDetail: any
  roomData : any = [];
  
  constructor(private titleService:Title, private room : RoomService, private router: Router, private route: ActivatedRoute) {

    const token = localStorage.getItem('token');
    const account_type = localStorage.getItem('account_type');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }

    if (account_type == "admin"){
      this.isEmployee = true;
    }
    else {
      this.isEmployee = false;
    }
  }


  ngOnInit():void {
    console.log(localStorage.getItem('room_detail'));
    
    this.room.getAllRoom().subscribe((data:any)=>{
      
      this.roomData = data.rooms;
      this.roomData = data.rooms;
    })
    this.uid = localStorage.getItem('room_detail')
    this.room.getRoomDetail(this.uid).subscribe((data:any)=>{
      console.log("data ne`: ",data);
      this.roomDetail = data
      console.log(data.rooms._id)
    })
  }
  getDetail()
  {
    this.room.getRoomDetail(this.uid).subscribe((data:any)=>{
      this.id = data.rooms._id
      this.room_no = data.rooms.room_no
      this.room_type = data.rooms.room_type
      this.price = data.rooms.price
      this.room_status = data.rooms.room_status
      this.clean_status =  data.rooms.clean_status
    })
  }

}