import { Component, OnInit } from '@angular/core';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
    feather.replace();
  }

}
