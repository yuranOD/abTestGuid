import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InputDataControllerService {

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  start(parent: any) {
    const parentName = parent.activeRoute.component.name;
    const params = this.activeRoute.snapshot.queryParams;

    const temp = {
      inputData:  {
        visitorsA: parseInt(params.visitorsA, 10) || 80000,
        conversionsA: parseInt(params.conversionsA, 10) || 1600,
        visitorsB: parseInt(params.visitorsB, 10) || 80000,
        conversionsB: parseInt(params.conversionsB, 10) || 1696,
      },

      setQueryParams() {
        parent.router.navigate([], {
          relativeTo: parent.router.url,
          queryParams: this.inputData,
          replaceUrl: true,
        });
      }
    };

    if (parentName === 'AbTestCalcComponent') {
      const abTestCalExtra = {
        confidence: params.confidence || '0.90',
        hypothesis: params.hypothesis || '1'
      };

      temp.inputData = Object.assign(temp.inputData, abTestCalExtra);
    }


    temp.setQueryParams();
    return temp;
  }
}
