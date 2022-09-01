import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img-book',
  templateUrl: './img-book.component.html',
  styleUrls: ['./img-book.component.scss']
})
export class ImgBookComponent implements OnInit {

  img: string = '';
  @Input('img')

  set changeImg(newImg: string) {
    this.img = 'data:image/png;base64,' + newImg;
  }
  imageDefault = './assets/images/empty.svg';

  constructor() { }

  ngOnInit(): void { }

  imgError() {
    this.img = this.imageDefault;
  }
}
