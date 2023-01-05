import { Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BookComponent } from './../book/book.component';
import { RoomService } from './../../services/room/room.service';
import { Title } from '@angular/platform-browser';
import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService} from 'src/app/services/account/account.service';
import { AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})


export class RoomComponent implements AfterViewInit {

  title = "Manage Room";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false;
  searchText: string ='';

  roomData : any = []
  dataSource = new MatTableDataSource <any>(this.roomData);
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatTable) table: MatTable<any>

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    console.log(localStorage.getItem('account_type'));
    this.room.getAllRoom().subscribe((data:any)=>{
      console.log("data:",data.rooms)
      console.log(typeof data.rooms);
      this.roomData = data.rooms;
      this.dataSource = new MatTableDataSource(data.rooms);
      this.dataSource.paginator = this.paginator;
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

  editRoom()
  {
    let isSelect = false;
    this.dataSource.data.forEach(row => {
      if(this.selection.isSelected(row))
        isSelect = true;
    })
    if(isSelect)
    this.isEdit= !this.isEdit;
    else
    alert("PLEASE SELECT A ROW !!!")

  }
  checkEdit(row:any)
  {
    return this.isEdit && this.selection.isSelected(row)
  }
  updateRoom()
  {
    console.log("updateRoom");
    if (this.isEdit)
    {
      console.log("isedit")
      this.isEdit= !this.isEdit;
      
      for (let i = 0; i< this.dataSource.data.length;i++)
      {
        this.room.updateData(this.dataSource.data[i]._id,this.dataSource.data[i]).subscribe(data=>{
          console.log(data)
        })
      }
      this.selection.clear()
      alert("Updated")
      //location.reload();
    }
  }

  delRoom()
  {
    let delList:any = []
    this.dataSource.data.forEach(row => {
      if(this.selection.isSelected(row))
        {
          delList.push(row)

        }
    })
    if (delList.length < this.dataSource.data.length && delList.length != 0 )
    {
      this.dataSource.data = this.dataSource.data.filter(element => !delList.includes(element));
      for (let i = 0; i < delList.length; i++)
      {
        console.log(delList[i]._id)
        this.room.delRoom(delList[i]._id).subscribe(data=>{
          console.log(data)
        });
      }
    }
    else if (delList.length <= 0 )
    alert("PLEASE SELECT A ROW !!!")
    else
    alert("NOT ALLOW TO CLEAR ALL DATA !!!")

    this.selection.clear()
    //location.reload();
  }

  addRoom()
  {
    let data = {room_no: '1000'}
    this.room.addRoom(data).subscribe(data=>{
      console.log(data)
    })
    location.reload();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  searchRoom() {
    this.router.navigate(['/search-room'])
  }

}
