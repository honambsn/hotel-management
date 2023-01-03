import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { AccountService } from 'src/app/services/account/account.service';
import {MatPaginator} from '@angular/material/paginator';
import { JsonpClientBackend } from '@angular/common/http';



@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements AfterViewInit {
  isEdit:boolean = false;
  isAuth:boolean = false;

  userData : any = []
  dataSource = new MatTableDataSource <any>(this.userData);




  displayedColumns: string[] = ['select','index','id', 'name', 'type','dob','address','email', 'password'];
  constructor(private account :AccountService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatTable) table: MatTable<any>


  ngOnInit(): void {
      this.account.getAllInfo().subscribe((data:any)=>{
         this.userData = data.users
        this.dataSource = new MatTableDataSource(this.userData)
        this.dataSource.paginator = this.paginator;

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

  editUser()
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
  updateUser()
  {
    if (this.isEdit)
    {
      this.isEdit= !this.isEdit;
      for (let i = 0; i< this.dataSource.data.length;i++)
      {
        this.account.updateInfo(this.dataSource.data[i]._id,this.dataSource.data[i]).subscribe(data=>{
          console.log(data)
        })
      }
      this.selection.clear()
      location.reload();
    }
  }

  delUser()
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
        this.account.delUser(delList[i]._id).subscribe(data=>{
          console.log(data)
        });
      }
    }
    else if (delList.length <= 0 )
    alert("PLEASE SELECT A ROW !!!")
    else
    alert("NOT ALLOW TO CLEAR ALL DATA !!!")

    this.selection.clear()
    location.reload();
  }

  addUser()
  {
    let data = {name:'Guest'}
    this.account.signup(data).subscribe(data=>{
      console.log(data)
    })
    location.reload();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

}
