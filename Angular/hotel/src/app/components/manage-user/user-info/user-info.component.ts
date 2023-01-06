import { Router } from '@angular/router';
import { RoomService } from './../../../services/room/room.service';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  title = "User info";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false;
  uid: any;


  edit:boolean = false;

  userDetail: any

  constructor(private titleService:Title, private account : AccountService, private router: Router, private route: ActivatedRoute, private room :RoomService) {

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

    console.log(localStorage.getItem('user_detail'))
    this.uid = localStorage.getItem('user_detail')
    this.account.getInfo(this.uid).subscribe((data:any)=>{
      this.userDetail = data.users
      console.log(this.userDetail)
    })
  }
  payAndPoint() {
    var data = {
      "_id" :this.userDetail._id
    }
    this.account.billAndPoint(data).subscribe((data:any) =>{
      console.log(data)
    })
    var data_room = {
      "_id" :this.userDetail._id
    }
    this.account.resetRoom(data_room).subscribe((data:any)=>{
      console.log(data);
    })
    var room_reset_status = {
      "room_status" : "Empty"
    }
    this.room.updateData(this.userDetail.roombooked[0], room_reset_status).subscribe((data:any)=>{
      console.log(data)      
    })
    location.reload()
  }
}
