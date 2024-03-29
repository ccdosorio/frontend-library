import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '@models';

@Component({
  selector: 'app-card-class',
  templateUrl: './card-class.component.html',
  styleUrls: ['./card-class.component.scss']
})
export class CardClassComponent implements OnInit {

  @Input() classroom: Classroom | undefined;
  @Input() isAssignment: boolean = false;

  constructor() { }

  ngOnInit(): void { }

}
