import { Title } from '@angular/platform-browser';
import { AccountService } from './../../services/account.service';
import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {
  title = "Sign Up";
  formSign: FormGroup;
  isLogin: boolean = false;
  
  constructor(private titleService:Title,private fb: FormBuilder, private account:AccountService, private router: Router){
    const token = localStorage.getItem('token');
    if (token){
      this.isLogin = true;
    }
    
  }
  
  ngOnInit() : void {
    
    this.titleService.setTitle(this.title);
    this.formSign = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onSign(){ 
    this.titleService.setTitle(this.title);

    if (this.formSign.invalid){ 
      alert("this.formLogin.invalid");
      return false;
    }
    console.log(this.formSign.value);
    this.account.login(this.formSign.value).subscribe((res:any) =>{
      if (res.status === true) {
        // lưu thông tin đăng nhập (ở đây là mã token) vào local storage
        localStorage.setItem('token', res.result);
        alert("dang nhap thanh cong");
        //sau khi đăng nhập thì chuyển hướng về home
        this.router.navigate(['/']);
      }
      else {
        alert("Data not found");
      }
      console.log(res);
    })
    return true;
    
  }

}
