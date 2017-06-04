
import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  title: string = 'Map';
  lat: number = 51.678418;
  lng: number = 7.809007;
}