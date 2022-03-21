import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { HomeComponent } from './components/templates/home/home.component';
import { LoginRegisterComponent } from './components/templates/login-register/login-register.component';
import { TlRegisterComponent } from './components/view/teamLeader/tl-register/tl-register.component';
import { TlListOneComponent } from './components/view/teamLeader/tl-list-one/tl-list-one.component';
import { TlListAllComponent } from './components/view/teamLeader/tl-list-all/tl-list-all.component';
import { EListAllComponent } from './components/view/employee/e-list-all/e-list-all.component';
import { EListOneComponent } from './components/view/employee/e-list-one/e-list-one.component';
import { ERegisterComponent } from './components/view/employee/e-register/e-register.component';
import { TListAllComponent } from './components/view/team/t-list-all/t-list-all.component';
import { TeamListOneComponent } from './components/view/team/team-list-one/team-list-one.component';
import { TeamRegisterComponent } from './components/view/team/team-register/team-register.component';
import { RoleListAllComponent } from './components/view/role/role-list-all/role-list-all.component';
import { RoleListRegisterComponent } from './components/view/role/role-list-register/role-list-register.component';
import { PenaltyListRegisterComponent } from './components/view/penalty/penalty-list-register/penalty-list-register.component';
import { PenaltyListAllComponent } from './components/view/penalty/penalty-list-all/penalty-list-all.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PenaltyListOneComponent } from './components/view/penalty/penalty-list-one/penalty-list-one.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { OnlyLettersDirective } from './directives/only-letters.directive';

registerLocaleData(localePt)



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegisterComponent,
    HeaderComponent,
    FooterComponent,
    TlRegisterComponent,
    TlListOneComponent,
    TlListAllComponent,
    EListAllComponent,
    EListOneComponent,
    ERegisterComponent,
    TListAllComponent,
    TeamListOneComponent,
    TeamRegisterComponent,
    RoleListAllComponent,
    RoleListRegisterComponent,
    PenaltyListRegisterComponent,
    PenaltyListAllComponent,
    PenaltyListOneComponent,
    OnlyNumbersDirective,
    OnlyLettersDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgxCurrencyModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: "pt-BR"
  },
  { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
