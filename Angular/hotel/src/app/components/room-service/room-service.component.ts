
import { Router } from '@angular/router';

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { AccountService } from 'src/app/services/account/account.service';
import {MatPaginator} from '@angular/material/paginator';
import { JsonpClientBackend } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { RoomService } from 'src/app/services/room/room.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
@Component({
  selector: 'app-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.css']
})
export class RoomServiceComponent {
  title = "Manage Services";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false;
  searchText: string ='';

  serviceData : any = []
  dataSource = new MatTableDataSource <any>(this.serviceData);
  displayedColumns: string[] = ['select','index','id', 'type_of_service', 'price','service_description', 'service_status'];

  constructor(private titleService:Title,  private router: Router, private user_service:UserServiceService) {
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
    this.user_service.getAllService().subscribe((data:any)=>{

      this.serviceData = data.services;
      console.log("data:",this.serviceData)
      this.dataSource = new MatTableDataSource(this.serviceData);
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

  editService()
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
  updateService()
  {
    console.log("updateRoom");
    if (this.isEdit)
    {
      console.log("isedit")
      this.isEdit= !this.isEdit;

      for (let i = 0; i< this.dataSource.data.length;i++)
      {
        this.user_service.updateSpecificService(this.dataSource.data[i]._id,this.dataSource.data[i]).subscribe(data=>{
          console.log(data)
        })
      }
      this.selection.clear()
      alert("Updated")
      //location.reload();
    }
  }

  delService()
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
        this.user_service.deleteService(delList[i]._id).subscribe(data=>{
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

  addNewService()
  {
    let data = {type_of_service:'Random Service'}
    this.user_service.addService(data).subscribe(data=>{
      console.log(data)
    })
   // location.reload();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  // searchRoom() {
  //   this.router.navigate(['/search-room'])
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  onSelect(element:any) {

    localStorage.setItem('service-id',element._id)

    let api = '/service-detail/'+element._id
    this.router.navigate([api]);
  }

}
