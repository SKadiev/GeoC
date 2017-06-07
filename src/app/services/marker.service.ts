import { Injectable } from "@angular/core";
import { Init } from '../shared/init-markers';
import { IMarker } from "app/map/marker";

@Injectable()
export class MarkerService extends Init {
    constructor(){
        console.log('pre constructor');
        super();
        console.log('marker service')
        this.load();
    }

    getMarkers():IMarker[]{
        let markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }

    addMarker(newMarker:IMarker):void{
        let  markers = JSON.parse(localStorage.getItem('markers'));

        markers.push(newMarker);

        localStorage.setItem('markers',JSON.stringify(markers));
    }

}