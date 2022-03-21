import { PenaltyListAllComponent } from './components/view/penalty/penalty-list-all/penalty-list-all.component';
import { TlRegisterComponent } from './components/view/teamLeader/tl-register/tl-register.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/templates/home/home.component';
import { LoginRegisterComponent } from './components/templates/login-register/login-register.component';
import { EListOneComponent } from './components/view/employee/e-list-one/e-list-one.component';
import { TListAllComponent } from './components/view/team/t-list-all/t-list-all.component';
import { EListAllComponent } from './components/view/employee/e-list-all/e-list-all.component';
import { TlListAllComponent } from './components/view/teamLeader/tl-list-all/tl-list-all.component';
import { TlListOneComponent } from './components/view/teamLeader/tl-list-one/tl-list-one.component';
import { TeamRegisterComponent } from './components/view/team/team-register/team-register.component';
import { TeamListOneComponent } from './components/view/team/team-list-one/team-list-one.component';
import { ERegisterComponent } from './components/view/employee/e-register/e-register.component';
import { RoleListAllComponent } from './components/view/role/role-list-all/role-list-all.component';
import { RoleListRegisterComponent } from './components/view/role/role-list-register/role-list-register.component';
import { PenaltyListRegisterComponent } from './components/view/penalty/penalty-list-register/penalty-list-register.component';
import { PenaltyListOneComponent } from './components/view/penalty/penalty-list-one/penalty-list-one.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginRegisterComponent },
  /////// teams related ///////
  { path: "teams", component: TListAllComponent },
  { path: "team/add", component: TeamRegisterComponent },
  { path: "team/:id", component: TeamListOneComponent },
  { path: "team/edit/:id", component: TeamRegisterComponent },
  /////// employees related ////////
  { path: "employees", component: EListAllComponent },
  { path: "employee/add", component: ERegisterComponent },
  // { path: "employee/:id", component: EListOneComponent },
  { path: "team/:idTeam/employee/edit/:id", component: ERegisterComponent },
  { path: "employee/edit/:id", component: ERegisterComponent },
  { path: "employee/team/:id", component: EListOneComponent },
  /////// team leader related ////////
  { path: "teamLeaders", component: TlListAllComponent },
  { path: "teamLeader/add", component: TlRegisterComponent },
  { path: "teamLeader/:id", component: TlListOneComponent },
  { path: "teamLeader/edit/:id", component: TlRegisterComponent },
  /////// role related ////////
  { path: "roles", component: RoleListAllComponent },
  { path: "role/add", component: RoleListRegisterComponent },
  { path: "role/edit/:id", component: RoleListRegisterComponent },
  /////// penalty related ////////
  { path: "penalties", component: PenaltyListAllComponent },
  { path: "penalties/team/:id", component: PenaltyListOneComponent },
  { path: "penalty/add", component: PenaltyListRegisterComponent },
  { path: "penalty/edit/:id", component: PenaltyListRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
