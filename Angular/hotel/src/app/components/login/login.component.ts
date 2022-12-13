import { AccountService } from './../../services/account.service';
import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  isAuth: boolean = false;
  
  constructor(private fb: FormBuilder, private account:AccountService, private router: Router){
    const token = localStorage.getItem('token');
    if (token){
       this.isAuth = true;
    }
   
  }
  ngOnInit() : void {
    
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  onLogin(){ 
    
    if (this.formLogin.invalid){ 
      //alert("Data not found");
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
