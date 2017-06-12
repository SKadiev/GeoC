
import { Component, OnInit, Input, Output } from '@angular/core';
import { IMarker } from './marker'
import { MarkerService } from "app/services/marker.service";
import { EventEmitter } from "@angular/core";


@Component({
  selector: 'geo-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers : [MarkerService]
})
export class MapComponent implements OnInit{
  zoom:number = 1;
  title: string = 'Map';
  lat: number = 51.678418;
  lng: number = 7.809007;
  markerName:string;
  markerNameGeo:string;  
  markerLat:string;
  markerLng:string;
  markerDraggable:string;
  @Input() currentKey:string;

  @Output()mapClosed : EventEmitter<boolean> = 
                  new EventEmitter<boolean>();
  
  ngOnChanges(){
    debugger;
    console.log(this.currentKey);
      this.setMarkers(this.currentKey);
  }

  constructor(private _markerService:MarkerService ){

  }

  ngOnInit(){
    this.markers =  this._markerService.getMarkers(this.currentKey);
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

    this._markerService.updateMarker(updMarker, newLatitude, newLongitude);
   
  }
  
  setMarkers(currentKey:string){
    this.markers = this._markerService.getMarkers(currentKey);
   
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
    this._markerService.addMarker(newMarker,this.currentKey);
    document.forms['addMarker'].reset();
    
  }

  addMarkers(currentKey:string):void{
    
  }

  addMarkerFromGeo(marker:IMarker):void{
    debugger; 
    console.log('geo detect');
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.getPosition.bind(this));

            
        } else {
            console.log('Your device dont support geolocation');
        }
    }

    getPosition(position):void{
      debugger;
      let newLatitude = position.coords.latitude;
      let newLongitude = position.coords.longitude;

      let newMarker:IMarker = {
        name:this.markerNameGeo,
        latitude:newLatitude,
        longitude:newLongitude,
        draggable:true
      };
      debugger;
      this.markers.push(newMarker);
      debugger;
       this._markerService.addMarker(newMarker,this.currentKey);
       document.forms['addMarkerfromGeo'].reset();

    }

  removeMarker(marker){
  
    console.log('remove marker');
    for (let markerIndex = 0; markerIndex < this.markers.length;markerIndex++){
      if (marker.latitude === this.markers[markerIndex].latitude && 
          marker.longitude === this.markers[markerIndex].longitude){
            this.markers.splice(markerIndex,1);
      }
   
    }
   this._markerService.removeMarker(marker);
  }
  
  closeMap($event):void{
    $event.preventDefault();
    this.mapClosed.emit(false);
  }

}