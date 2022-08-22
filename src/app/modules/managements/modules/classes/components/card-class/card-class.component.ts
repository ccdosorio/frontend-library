import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-class',
  templateUrl: './card-class.component.html',
  styleUrls: ['./card-class.component.scss']
})
export class CardClassComponent implements OnInit {

  actionButton: string = 'Edit';

  constructor() { }

  ngOnInit(): void {
  }

  editClass(): void {
    console.log('edit');
  }

}
