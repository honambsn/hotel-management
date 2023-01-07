import { SelectionModel } from '@angular/cdk/collections';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-potential-list',
  templateUrl: './potential-list.component.html',
  styleUrls: ['./potential-list.component.css']
})
export class PotentialListComponent {
  title = "Potential User";
  isEdit:boolean = false;
  isAuth:boolean = false;
  isEmployee: boolean = false

  type = "text";
  type2 = "password";
  showPss:boolean = true


  userData : any = []
  
  dataSource = new MatTableDataSource <any>(this.userData);
  displayedColumns: string[] = ['select','index','id', 'name', 'type','dob','address','email', 'password', 'point', 'payment'];

constructor(private account :AccountService, private titleService:Title, private router: Router) {
    const token = localStorage.getItem('token');
    const account_type = localStorage.getItem('account_type');
    if (token) {
      this.isAuth = true;
    }
    else {
      this.isAuth = false;
    }

    if (account_type == "admin") {
      this.isEmployee  = true;
    }
    else {
      this.isEmployee = false
    }

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatTable) table: MatTable<any>


  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    

    this.titleService.setTitle(this.title);
    console.log("account type: ",localStorage.getItem('account_type'))
    console.log("check: ",this.isEmployee);
      this.account.getAllInfo().subscribe((data:any)=>{
        this.userData = data.users
        this.userData.sort(function(a:any,b:any) {
          return b.point - a.point;
        });

        this.userData  = this.userData.slice(0, 10);

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
    //location.reload();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  onSelect(element:any) {
    localStorage.setItem('user_detail',element._id)
    console.log(localStorage.getItem('user_detail') as string)
    this.router.navigate(['/user-detail', element._id]);
  }

  showPass() {
    
    console.log(this.showPss)
    if (this.showPss) {
      this.type = "text";

    }
    else this.type = "password";
    this.showPss = !this.showPss;
  }

  showAllUser() {
    this.router.navigate(['/manage-user']);
  }
}
