import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  title = "Test";

  constructor(private titleService:Title) {

  }
  ngOnInit():void{
    this.titleService.setTitle(this.title);
  }
}
