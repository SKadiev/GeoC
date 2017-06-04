

import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-calendar',
    templateUrl:'./calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
      

    year:number;
    month:string;
    days: number[];
    currentDay:number;
    currentDate:Date;
    months:string[] = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    setMonth(currentDate:Date):string{
        return this.months[currentDate.getMonth()];
    }

    getNumberOfDaysInCurrentMonth(currentDate: Date): number{
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }
    
    changeMonth(event):void{
   
        if (event.target.className === 'prev') {
            if (this.currentDate.getMonth() === 0){
                this.currentDate.setMonth(11);
                this.month = this.months[this.currentDate.getMonth()]
                --this.year;
            }else{
            let month:number  = this.currentDate.getMonth() - 1;
            this.month = this.months[month]
            this.currentDate.setMonth(month);
            }   

        } else if (event.target.className === 'next') {
             if (this.currentDate.getMonth() === 11){
                this.currentDate.setMonth(0);
                this.month = this.months[this.currentDate.getMonth()]
                ++this.year;
            }else{
            let month:number  = this.currentDate.getMonth() + 1;
            this.month = this.months[month]
            this.currentDate.setMonth(month);
            }   
        }
    }

    ngOnInit(): void {
        this.initDate();    
    }

    initDate():void{
        this.currentDate = new Date();
        this.currentDay =  this.currentDate.getDate();
        this.year =  this.currentDate.getFullYear();
        console.log( this.currentDate)
        this.month = this.setMonth( this.currentDate);
        let days = this.getNumberOfDaysInCurrentMonth( this.currentDate);
        this.days = Array.from(Array(days).keys()).map(i => i +1);
    }

}