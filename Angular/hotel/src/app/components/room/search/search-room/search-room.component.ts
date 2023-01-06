import { HighlightDirective } from './../highlight.pipe';
import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { switchMap } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room/room.service';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';



@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.css']
})


export class SearchRoomComponent {

  title = "Manage Room";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false;

  //characters :any =[]

  rooms: any = [];


  
  searchText = '';

  roomData : any = []
  displayedColumns: string[] = ['select','index','id', 'room_no', 'room_type', 'price', 'room_status', 'clean_status', 'createAt', 'updateAt'];
  constructor(private titleService:Title, private room : RoomService, private router: Router) {
    const token = localStorage.getItem('token');
    const account_type = localStorage.getItem('account_type');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }

    if (account_type == "admin"){
      this.isEmployee = true;
    }
    else {
      this.isEmployee = false;
    }
  }


  ngOnInit():void {
    this.room.getAllRoom().subscribe((data:any)=>{
      console.log("data:",data.rooms)
      console.log(typeof data.rooms);
      this.roomData = data.rooms;
      for (let i = 0; i < Object.keys(data.rooms).length; i++) {
        console.log(data.rooms[i]._id)
        // this.characters.push(data.rooms[i].room_no)
        //this.characters.push(data.rooms[i])
      }
      this.rooms = data.rooms;
    })
  }
  onSelect(room:any) {
    localStorage.setItem('room_detail',room._id)
    this.router.navigate(['/room-detail', room._id]);
  }

  
  
}
