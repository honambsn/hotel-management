
import {Component,OnInit} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = "Profile";
  name:any;
  email:any;
  dob : any
  address: any
  type:any
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
    password: "",
    dob: "",
    address: "",

  }
  // check xem token co hop le hay khong de access vao book list
  constructor(private account :AccountService, private titleService:Title) {

    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }
  ngOnInit(): void {
    this.titleService.setTitle(this.title)
    console.log(localStorage.getItem("uid"))
    this.account.getInfo(localStorage.getItem("uid")).subscribe((data:any)=>{
      //console.log(data)
      this.name = data.users.name
      this.email = data.users.email
      this.pass = data.users.password
      this.type = data.users.type
      this.dob = data.users.dob;
      this.address = data.users.address;
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
    this.nPass=this.oPass=this.cPass= "";
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
          this.info.dob = this.dob;
          this.info.address = this.address;
          console.log(this.info)
          this.account.updateInfo(localStorage.getItem('uid'),this.info ).subscribe((data:any)=>{
            alert("UPDATE INFORMATION: "+ data.users.acknowledged)
      })
          }
      // this.save = !this.save;
    }

  }

}
