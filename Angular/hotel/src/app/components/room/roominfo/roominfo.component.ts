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
  checkIn:any;
  checkOut:any;
  edit:boolean = false;

  roomDetail: any
  roomData : any = [];

  constructor(private titleService:Title, private room : RoomService, private router: Router, private route: ActivatedRoute, private account:AccountService) {

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
    this.titleService.setTitle(this.title)
    this.uid = localStorage.getItem('room_detail')
    this.room.getRoomDetail(this.uid).subscribe((data:any)=>{
      this.roomDetail = data.rooms
      console.log(this.roomDetail)

      this.checkIn = this.roomDetail.checkInAt
      this.checkOut = this.roomDetail.checkOutAt

    })
  }

  // getDetail()
  // {
  //   this.room.getRoomDetail(this.uid).subscribe((data:any)=>{
  //     this.id = data.rooms._id
  //     this.room_no = data.rooms.room_no
  //     this.room_type = data.rooms.room_type
  //     this.price = data.rooms.price
  //     this.room_status = data.rooms.room_status
  //     this.clean_status =  data.rooms.clean_status
  //   })
  // }


  bookService() {
    var data = {
    "_id" : "63b8060a8b02574e6ea10311"
    }
    this.account.addService(localStorage.getItem('uid'), data).subscribe(data=>{
      console.log(data)
    })
    console.log("booked")
  }
  cancelService() {
    var data = {
      "_id":"63b8060a8b02574e6ea10311"
    }
    var uid = localStorage.getItem('uid')
    this.account.cancelService(uid,data).subscribe(data=>{
      console.log(data)
    })
  }
  bookRoom() {


    var uid = localStorage.getItem('uid')
    var data ={ "_id" : this.roomDetail._id,
      "checkInAt" : "1/1/2000",
      "checkOutAt" : "2/2/2002",
    }
    console.log(typeof data)
    this.account.bookRoom(uid, data ).subscribe(data=>{
      console.log(data);
    });
    console.log("booked")
    location.reload();
  }

  cancelRoom() {
    var uid = localStorage.getItem('uid')
     var data ={ "_id" : this.roomDetail._id
    }
    console.log(typeof data)
    this.account.cancelRoom(uid, data ).subscribe(data=>{
      console.log(data);
    });
    console.log("cancelled")
    location.reload();
  }

checkStatus():boolean
  {
    if (this.roomDetail.room_status == "Booked")
    return true
    else return false
  }
  editCheckInOut()
  {
    this.edit=true;
  }
  updateCheckInOut()
  {

    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    if (this.edit){
      if (this.checkIn && this.checkOut && this.checkIn.match(dateFormat) && this.checkOut.match(dateFormat) ) {
        var uid = localStorage.getItem('room_detail')
        let checkin = {"checkInAt":this.checkIn, "checkOutAt":this.checkOut}
        this.room.updateData(uid,checkin).subscribe(resust=>{
          console.log(resust)

        })
      } else {
        this.ngOnInit()
        alert('Input does not match the dd/mm/yyyy format');

      }
    }

    this.edit = false;
  }
}

