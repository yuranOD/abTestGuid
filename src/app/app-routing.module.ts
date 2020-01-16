import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbTestCalcComponent } from './ab-test-calc/ab-test-calc.component';
import { BayesCalcComponent } from './bayes-calc/bayes-calc.component';


const routes: Routes = [
  { path: 'abtest-calc', component: AbTestCalcComponent },
  { path: 'bayes-calc', component: BayesCalcComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
