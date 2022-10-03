import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  @ViewChild('inputTheme') inputTheme!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
    feather.replace();
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('darkMode')) {
      const body = document.getElementsByTagName('body')[0];
      this.inputTheme.nativeElement.checked = false;
      body.classList.add('is-dark');
    }
  }

  setTheme(): void {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains('is-dark')) {
      body.classList.remove('is-dark');
      localStorage.removeItem('darkMode');
    } else {
      body.classList.add('is-dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    }
  }

}
