
import { Component, OnInit } from '@angular/core';
import { IMarker } from './marker'
import { MarkerService } from "app/services/marker.service";


@Component({
  selector: 'geo-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers : [MarkerService]
})
export class MapComponent implements OnInit{
  zoom:number = 7;
  title: string = 'Map';
  lat: number = 51.678418;
  lng: number = 7.809007;
  markerName:string;
  markerLat:string;
  markerLng:string;
  markerDraggable:string;

  constructor(private _markerService:MarkerService ){

  }

  ngOnInit(){
    this.markers =  this._markerService.getMarkers();
  }

  markers:IMarker[] = [
   
  ];

  clickedMarker(marker:IMarker, index:number):void{
    console.log('Clicked marker' + marker.name + ' ' + index );
    marker.name = 'Clicked marker' + marker.name + ' at index ' + index;
  }

  markerDragEnd(marker:IMarker,$event:any):void{
    console.log('dragEnd',marker,$event);

    let updMarker:IMarker = {
      name :marker.name,
      latitude: marker.latitude,
      longitude : marker.longitude,
      draggable : marker.draggable
    };

    let newLatitude = $event.coords.lat;
    let newLongitude= $event.coords.lng;
   
  }
  
  addMarker():void{
    console.log("map it");
    let isDraggable;

    if (this.markerDraggable === 'yes') {
      isDraggable = true;
    } else {
      isDraggable = false;
    }
    
    let newMarker = {
      name: this.markerName,
      latitude: parseFloat(this.markerLat),
      longitude : parseFloat(this.markerLng),
      draggable : isDraggable
    };

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  
    
  }

 
}