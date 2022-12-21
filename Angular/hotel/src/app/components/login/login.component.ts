import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = "Login";


  formLogin: FormGroup;
  isAuth: boolean = false;
  


  constructor(private titleService:Title, private fb: FormBuilder, private account:AccountService, private router: Router){
    const token = localStorage.getItem('token');
    if (token){
       this.isAuth = true;
    }
    
  }
  
  ngOnInit() : void {
    this.titleService.setTitle(this.title);
    
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onLogin(){ 
    
    if (this.formLogin.invalid){ 
      alert("this.formLogin.invalid");
      return false;
    }
    console.log(this.formLogin.value);
    this.account.login(this.formLogin.value).subscribe((res:any) =>{
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
