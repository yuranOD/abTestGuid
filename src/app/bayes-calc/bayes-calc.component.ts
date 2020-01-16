import { Component, OnInit } from '@angular/core';
import { InputDataControllerService } from '../input-data-controller.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bayes-calc',
  templateUrl: './bayes-calc.component.html',
  styleUrls: ['./bayes-calc.component.scss']
})
export class BayesCalcComponent implements OnInit {
  dataController = this.inputDataController.start(this);
  dataValues = this.dataController.inputData;

  constructor(private router: Router, private inputDataController: InputDataControllerService, private activeRoute: ActivatedRoute) { }

  euroFocus(e: Event) {
    const parent = (e.target as HTMLElement).parentElement;
    if (parent.classList.contains('focus')) {
      parent.classList.remove('focus');
    } else {
      parent.classList.add('focus');
    }
  }

  log(temp: any) {
    this.dataController.setQueryParams();
  }

  ngOnInit() {
  }
}
