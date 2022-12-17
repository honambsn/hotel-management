import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
  title = "Policy";
  constructor(private titleService: Title) {
    
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
