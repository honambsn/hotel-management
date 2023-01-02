import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  title = "Manage User";
  isEdit:boolean = false;
  isAuth:boolean = false;

  userData : any = []
  dataSource = new MatTableDataSource <any>(this.userData);
  displayedColumns: string[] = ['id', 'name', 'email', 'password'];
  constructor(private account :AccountService, private titleService:Title) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.account.getAllInfo().subscribe((data:any)=>{
      console.log(data.users)
      this.dataSource = new MatTableDataSource(data.users)
      
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
