import { Title } from '@angular/platform-browser';
import { AccountService } from 'src/app/services/account/account.service';
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
      name:['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
    })
  }
  


  onSign(){ 

    if (this.formSign.invalid){ 
      alert("this.formLogin.invalid");
      return false;
    }
    console.log(this.formSign.value);

    var pass1 = Object.values(this.formSign.value)[2];
    var pass2 = Object.values(this.formSign.value)[3];
    
    try {
      pass1 = Object.values(this.formSign.value)[2];
      pass2 = Object.values(this.formSign.value)[3];
      
      if (typeof pass1 === 'string' || pass2 === 'string') {
        
        console.log(typeof pass1, typeof pass2);
        
        console.log("true");
        this.check(pass1, pass2);
        console.log("checked");
      }

    }
    catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
    

    return true;
  }

  check(pass1:any,pass2:any){
    if (pass1.localeCompare(pass2) == 0){
      delete this.formSign.value.repeat_password;


      console.log("true");
      console.log(this.formSign.value);
      this.account.signup(this.formSign.value).subscribe((res:any) =>{
        console.log("res: ", res);
        alert("tao tai khoan thanh cong. Vui long dang nhap de tiep tuc");
        this.router.navigate(['/login']);
      }
    )}
  }
  

}
