import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  templateUrl: './button-custom.component.html',
  styleUrls: ['./button-custom.component.scss']
})
export class ButtonCustomComponent implements OnInit {

  @Input() action: string = '';

  @Output() actionButton = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onActionButton() {
    this.actionButton.emit();
  }

}
