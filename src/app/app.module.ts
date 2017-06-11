import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CalendarComponent } from "app/calendar/calendar.component";
import { MapComponent } from "./map/map.component";
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MapComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBKIURbIOFcquS1FvkjgxIOd9CvPsJoAls'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
