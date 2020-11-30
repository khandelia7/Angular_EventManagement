import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventmanagerComponent } from './eventmanager/eventmanager.component';
import { ParticipentComponent } from './participent/participent.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginComponent } from './login/login.component';
import { eventmanager } from './services/eventmanager.service'
import { participent } from './services/participent.service'
import { login } from './services/login.servicxe';
import { HodComponent } from './hod/hod.component';
import { hod } from './services/hod.service';
import { HomeComponent } from './home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreateEventComponent } from './create-event/create-event.component';
import { FilterEventComponent } from './filter-event/filter-event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventmanagerComponent,
    ParticipentComponent,
    NotFoundPageComponent,
    LoginComponent,
    HodComponent,
    HomeComponent,
    CreateEventComponent,
    FilterEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule
  ],
  providers: [eventmanager, participent, login, hod],
  bootstrap: [AppComponent]
})
export class AppModule { }
