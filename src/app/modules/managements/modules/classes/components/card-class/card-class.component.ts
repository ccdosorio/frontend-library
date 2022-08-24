import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '@models';

@Component({
  selector: 'app-card-class',
  templateUrl: './card-class.component.html',
  styleUrls: ['./card-class.component.scss']
})
export class CardClassComponent implements OnInit {

  actionButton: string = 'Edit';

  @Input() classroom: Classroom | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.classroom);
    
  }

  editClass(): void {
    console.log('edit');
  }

}
