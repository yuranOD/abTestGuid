import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InputDataControllerService } from '../input-data-controller.service';
// const { jStat } = require('jstat');

@Component({
  selector: 'app-ab-test-calc',
  templateUrl: './ab-test-calc.component.html',
  styleUrls: ['./ab-test-calc.component.scss']
})
export class AbTestCalcComponent implements OnInit {
  dataController = this.inputDataController.start(this);
  dataValues = this.dataController.inputData;
  result: object;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private inputDataController: InputDataControllerService, ) {

  }

  hover(e: Event) {
    console.log(e.target);
  }

  log(temp: any) {
    this.dataController.setQueryParams();
  }

  calc() {
    const zTable = {
      1: {
        0.9: 1.281551,
        0.95: 1.644853,
        0.99: 2.326348
      },
      2: {
        0.9: 1.644853,
        0.95: 1.959964,
        0.99: 2.575829
      },
    };

    function normDist(x, mean, sd, cumulative) {
      // Check parameters
      if (isNaN(x) || isNaN(mean) || isNaN(sd)) return '#VALUE!';
      if (sd <= 0) return '#NUM!';
      // Return normal distribution computed by jStat [http://jstat.org]
      return (cumulative) ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd);
    }

    function perc(temp: number) {
      return (temp * 100).toFixed(2) + '%';
    }

    // tslint:disable-next-line: one-variable-per-declaration
    let power: any,
      positive: boolean;
    const crA = this.dataValues.conversionsA / this.dataValues.visitorsA;
    const crB = this.dataValues.conversionsB / this.dataValues.visitorsB;
    const crUplift = (crB - crA) / crA;
    const seA = Math.sqrt((crA * (1 - crA)) / this.dataValues.visitorsA);
    const seB = Math.sqrt((crB * (1 - crB)) / this.dataValues.visitorsB);
    const hypothesis = Number(this.dataValues.hypothesis);
    const confidence = Number(this.dataValues.confidence);
    console.log(this.dataValues.visitorsB);

    const seDiff = Math.sqrt(Math.pow(seA, 2) + Math.pow(seB, 2));
    const zScore = (crB - crA) / seDiff;
    const zCritical = zTable[hypothesis][confidence];
    console.log(zCritical);
    const lowerA = crA - (zCritical * seA);
    const upperA = crA + (zCritical * seA);
    const lowerB = crB - (zCritical * seB);
    const upperB = crB + (zCritical * seB);
    const powerInput = (crA + seA * zCritical - crB) / seB;
    const pValue = 1 - normDist(zScore, 0, 1, true);
    const significant = (pValue < (1 - confidence) && hypothesis == 1 || ((pValue > (confidence + (1 - confidence) / 2) || pValue < (1 - confidence - (1 - confidence) / 2)) && hypothesis == 2)) ? true : false;
    positive = (crB > crA) ? true : false;

    if (positive || hypothesis === 1) {
      power = 1 - normDist(((crA + seA * zCritical - crB) / seB), 0, 1, true);
    } else {
      power = 1 - normDist(((crB + seB * zCritical - crA) / seA), 0, 1, true);
    }

    function round(num, dec) {
      return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }

    this.result = {
      crA: perc(crA),
      crB: perc(crB),
      crUplift: perc(crUplift),
      seA: round(seA, 6),
      seB: round(seB, 6),
      seDiff: round(seDiff, 6),
      zScore: round(zScore, 4),
      zCritical,
      lowerA,
      power: perc(power),
      pValue: (pValue).toFixed(4),
    };

    // $('#crA,#resCrA').html(perc(crA));
    // $('#crB,#resCrB').html(perc(crB));
    // $('#crUplift,#resUplift,#resUplift2').html(perc(crUplift));
    // $('#seA').html(round(seA, 6));
    // $('#seB').html(round(seB, 6));
    // $('#seDiff').html(round(seDiff, 6));
    // $('#zScore').html(round(zScore, 4));
    // $('#zCritical').html(zCritical);
    // $('#lowerA').html(lowerA);
    // $('#power').html(perc(power));
    // $('#pValue').html((pValue).toFixed(4));

    // if (significant == true) {
    //   $('#result_txt').html(txtLib.result_ISsignificant).parent().removeClass('bs-callout-primary').addClass('bs-callout-success');;
    //   $('#result_is_significant').show();
    //   $('#result_isnot_significant').hide();
    //   $('#result_conf').text(confidence * 100);
    //   $('#result_tailed').text(tailed);
    //   $('#crUplift').addClass('success');
    //   $('#higherlower').html((crA>crB)?"lower":"higher");
    //   if (crA>crB) $('#resUplift').html(perc(Math.abs(crUplift)));
    // } else {
    //   $('#result_txt').html(txtLib.result_NOTsignificant).parent().removeClass('bs-callout-success').addClass('bs-callout-primary');
    //   $('#result_nrconversion').hide();
    //   $('#result_isnot_significant').show();
    //   $('#result_is_significant').hide();
    //   $('#crUplift').removeClass('success');
    // }
  }

  ngOnInit() {

    this.calc();
    console.log(this.result);

  }

}
