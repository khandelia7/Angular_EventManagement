import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventmanagerComponent } from './eventmanager/eventmanager.component';
import { HodComponent } from './hod/hod.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ParticipentComponent } from './participent/participent.component';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboad1/:username', component: EventmanagerComponent},
  {path: 'dashboad2/:username', component: ParticipentComponent},
  {path: 'dashboad3/:username', component: HodComponent},
  {path: '**', component: NotFoundPageComponent}, // Wild-Card
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
