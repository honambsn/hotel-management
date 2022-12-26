import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  title = "Book";
  isAuth: boolean = false;

  // check xem token co hop le hay khong de access vao book list
  constructor(private titleService:Title ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
    console.log(token);
  }

  ngOnInit():void{
    this.titleService.setTitle(this.title);
    //this.isAuth = true;
  }
}
