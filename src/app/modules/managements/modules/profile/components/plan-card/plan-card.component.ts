import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInfo } from '@models';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {

  @Input() user: UserInfo | undefined;

  @Output() onUpdated: EventEmitter<number> = new EventEmitter();

  // flags
  isBasicPlan: boolean = false;
  isTeacherPlan: boolean = false;
  isFamilyPlan: boolean = false;

  // values
  titlePlan: string = '';
  pricePlan: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.user?.authorities.length === 1) {
      this.isBasicPlan = true;
      this.titlePlan = 'Plan Básico';
      this.pricePlan = 5;
    }

    if (this.user!.authorities.length > 1) {
      this.user!.authorities.filter(item => {
        if (item.name === 'PROFESSOR_USER_ROLE') {
          this.isTeacherPlan = true;
          this.titlePlan = 'Plan Profesor';
          this.pricePlan = 15;
        }
        if (item.name === 'FAMILY_USER_ROLE') {
          this.isFamilyPlan = true;
          this.titlePlan = 'Plan Familiar';
          this.pricePlan = 10;
        }
      });
    }
  }

  update(): void {
    this.onUpdated.emit(2);
  }

}
