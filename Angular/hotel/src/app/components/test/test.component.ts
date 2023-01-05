import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',

  styleUrls: ['./test.component.css']
})
export class TestComponent {
 departments = [
  {"id":1, "name": 2},
  {"id":2, "name": 2},
  {"id":3, "name": 2},
  {"id":4, "name": 2}]
  
  constructor(private router:Router){}
  onSelect(department:any )  {
    this.router.navigate(['/room-detail', department.id]);
    

    
  }
  

}

