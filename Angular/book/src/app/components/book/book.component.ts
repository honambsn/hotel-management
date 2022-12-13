import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  isAuth: boolean = false;

  // check xem token co hop le hay khong de access vao book list
  constructor() {
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
    //this.isAuth = true;
  }
}
