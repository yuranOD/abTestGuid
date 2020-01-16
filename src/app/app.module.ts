import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AbTestCalcComponent } from './ab-test-calc/ab-test-calc.component';
import { BayesCalcComponent } from './bayes-calc/bayes-calc.component';
import { InputDataControllerService } from './input-data-controller.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AbTestCalcComponent,
    BayesCalcComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [InputDataControllerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
