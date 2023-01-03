import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
