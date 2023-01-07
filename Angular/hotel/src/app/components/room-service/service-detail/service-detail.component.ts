import { Router } from '@angular/router';
import { RoomService } from './../../../services/room/room.service';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent {
  title = "Service Detail";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false;
  uid: any;


  edit:boolean = false;

  serviceDetail: any

  constructor(private titleService:Title, private service : UserServiceService, private router: Router, private route: ActivatedRoute) {

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

    this.uid = localStorage.getItem('service-id')
    this.service.getServiceInfo(this.uid).subscribe((data:any)=>{
      this.serviceDetail = data.services
      console.log(this.serviceDetail)
    })
  }

}
