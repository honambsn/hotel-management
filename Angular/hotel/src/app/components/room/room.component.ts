import { BookComponent } from './../book/book.component';
import { RoomService } from './../../services/room/room.service';
import { Title } from '@angular/platform-browser';
import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService} from 'src/app/services/account/account.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  title = "Manage Room";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false

  roomData : any = []
  dataSource = new MatTableDataSource <any>(this.roomData);
  displayedColumns: string[] = ['slug','id', 'room_no', 'room_type', 'price', 'room_status', 'clean_status', 'createAt', 'updateAt'];
  constructor(private titleService:Title, private room : RoomService) {
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

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    console.log(localStorage.getItem('account_type'));
    this.room.getAllRoom().subscribe((data:any)=>{
      console.log("data:",data.rooms)
      console.log(typeof data.rooms);

      this.dataSource = new MatTableDataSource(data.rooms)
      console.log(this.dataSource.data.length);
      
    })

  }

  selection = new SelectionModel<any>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  onRowClick(event: MouseEvent) {
    if(event.currentTarget)
    if ((event.currentTarget as HTMLElement).nodeName !== 'MAT-CHECKBOX') {
      event.preventDefault();
    }
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          this.selection.select(row)

        }
          );
  }

  editInfo()
  {
    this.isEdit= !this.isEdit;
    this.displayedColumns.unshift('select')
    
  }

  saveInfo()
  {
    if (this.isEdit)
    {
      this.isEdit= !this.isEdit;
      this.selection.clear()
      const index = this.displayedColumns.indexOf('select');

      if (index > -1) {
        this.displayedColumns.splice(index, 1);
        }
      }
  }

}
