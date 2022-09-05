import { Component, Input, OnInit } from '@angular/core';
import { SearchHit } from '@models';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  @Input() book: SearchHit | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
