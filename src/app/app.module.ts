import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CalendarComponent } from "app/calendar/calendar.component";
import { MapComponent } from "./map/map.component";
import { AgmCoreModule } from 'angular2-google-maps/core';
import { RouterModule } from '@angular/router';
import { HistoryComponent } from "app/history/history.component";
import { DetailsComponent } from "app/details/details.component";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MapComponent,
    HistoryComponent,
    DetailsComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBKIURbIOFcquS1FvkjgxIOd9CvPsJoAls'
    }),
    RouterModule.forRoot([
      {path : 'calendar',component : CalendarComponent},
      {path : '',redirectTo :'calendar', pathMatch:'full'},
      {path : 'history',component : HistoryComponent},
       {path : 'details',component : DetailsComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
