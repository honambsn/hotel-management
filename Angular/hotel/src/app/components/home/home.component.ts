import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Home";
  constructor(private titleService:Title,){

  }
  ngOnInit(){
    this.titleService.setTitle(this.title);
  }
  
}
