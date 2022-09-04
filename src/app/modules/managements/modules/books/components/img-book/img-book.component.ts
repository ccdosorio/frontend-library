import { Component, Input, OnInit } from '@angular/core';

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
  imageDefault = './assets/img/illustrations/onboarding/set2-1.svg';

  constructor() { }

  ngOnInit(): void { }

  imgError() {
    this.img = this.imageDefault;
  }
}
