
import {Component,OnInit} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { AccountService } from './../../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name:any;
  email:any;
  private pass:any;
  nPass:any;
  oPass:any;
  cPass:any;
  hide:boolean = true;
  changePass:boolean = false;
  edit:boolean = false;
  // save:boolean = true;
  isAuth: boolean = false;
  private info = {
    name:"",
    email:"",
    password: ""
  }
  // check xem token co hop le hay khong de access vao book list
  constructor(private account :AccountService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }
  ngOnInit(): void {
    console.log(localStorage.getItem("uid"))
    this.account.getInfo(localStorage.getItem("uid")).subscribe((data:any)=>{
      this.name = data.users.name
      this.email = data.users.email
      this.pass = data.users.password
    })

  }
  getInfo()
  {

  }
  editProfile()
  {
    this.edit=  !this.edit;
    // this.save = !this.save;
  }
  changePw()
  {
    this.changePass = !this.changePass;
    this.nPass=this.oPass="";
  }
  updateProfile()
  {
    if (this.edit == false && this.changePass == false)
    return
    else
    {
      if (!this.name || !this.email )
      alert("FILL IN THE BLANK !!!")
      else
        {
          if(this.changePass == true)
          {
            if (! this.oPass|| !this.nPass )
           { alert("FILL IN THE BLANK !!!")
          return}
            else if (this.oPass != this.pass)
            {alert("OLD PASSWORD NOT MATCH !!")
          return}
          else if (this.nPass != this.cPass)
          {alert("CONFIRM NEW PASSWORD NOT MATCH !!")
        return}

          return}

            else
            {
              this.pass = this.nPass
              this.changePw();

            }
          }
          if (this.edit == true)
          this.edit=  !this.edit;
          this.info.name = this.name;
          this.info.email = this.email;
          this.info.password = this.pass;
          console.log(this.info)
          this.account.updateInfo(localStorage.getItem('uid'),this.info ).subscribe((data:any)=>{
            alert("UPDATE INFORMATION: "+ data.users.acknowledged)
      })
          }
      // this.save = !this.save;
    }

  }
