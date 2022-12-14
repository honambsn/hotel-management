import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hotel-Management';
  constructor(private titleService: Title) {

    // const token = localStorage.getItem('token');
    
    // console.log(token);
  }
  OnInit(){
    this.titleService.setTitle(this.title);
  }
}
