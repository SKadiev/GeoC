import { Injectable } from "@angular/core";
import { Init } from '../shared/init-markers';
import { IMarker } from "app/map/marker";
import {MapComponent} from "../map/map.component"

@Injectable()
export class MarkerService extends Init {
    constructor(){
        super();
        this.load();
    }

    getMarkers(dataKey:string):IMarker[]{
        let markers;
        if (!localStorage.getItem(dataKey)){
            markers = [];
        }else{
            markers = JSON.parse(localStorage.getItem(dataKey));
        }
        
        return markers;
    }

    addMarker(newMarker:IMarker,dateKey:string):void{
        debugger;
        if ( !(localStorage.getItem(dateKey))) {
            localStorage.setItem(dateKey, JSON.stringify([]));
         
        } 
        let  markers = JSON.parse(localStorage.getItem(dateKey));
        markers.push(newMarker);
        localStorage.setItem(dateKey,JSON.stringify(markers));
    
    }

    updateMarker(updMarker:IMarker, newLatitude:number, newLongitude:number){
        let markers = JSON.parse(localStorage.getItem('markers'));

        for (let i = 0; i < markers.length;i++) {
            if (markers[i].latitude === updMarker.latitude && 
                markers[i].longitude === updMarker.longitude) {
               
                markers[i].latitude = newLatitude;
                markers[i].longitude = newLongitude;
            }

            localStorage.setItem('markers', JSON.stringify(markers));
        }     
    }

    removeMarker(marker:IMarker){
        let markers = JSON.parse(localStorage.getItem('markers'));
        for (let markerIndex = 0; markerIndex < markers.length;markerIndex++){
            if (marker.latitude === markers[markerIndex].latitude &&
                marker.longitude === markers[markerIndex].longitude){
            markers.splice(markerIndex,1);
            }
   
        }

        localStorage.setItem('markers', JSON.stringify(markers));
    }
   
    
}