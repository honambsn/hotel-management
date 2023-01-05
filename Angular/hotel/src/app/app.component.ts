import { TestComponent } from './components/test/test.component';
import { RoominfoComponent } from './components/room/roominfo/roominfo.component';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hotel-Management';
  constructor(private titleService: Title, private router: Router) {

    // const token = localStorage.getItem('token');

    // console.log(token);
  }
  
  ngOnInit(){
    //this.router.navigate(['/home']);
    this.titleService.setTitle(this.title);
  }



}
