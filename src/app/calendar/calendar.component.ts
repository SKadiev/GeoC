

import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-calendar',
    templateUrl:'./calendar.component.html',
    styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
      

    year:number;
    month:string;
    days: any[];
    currentDay:number;
    currentDate:Date;
    months:string[] = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    currentKey:string;

    daysOfWeek = {
        Mon : 0,
        Tue: 1,
        Wed : 2,
        Thu : 3,
        Fri : 4,
        Sat : 5,
        Sun: 6
    };

    getDayOfWeek(day:Date):string{
        return  day.toString().slice(0, 3);
    }

    initDayOdWeek():void{
        
        let year = this.year.toString();
        let month = (Number(this.months.indexOf(this.month)) + 1).toString();
        let day = new Date(year + "-" + month + "-01");
        let dayOfWeek:string = this.getDayOfWeek(day);

        for (let prependedListItems = 0;prependedListItems < this.daysOfWeek[dayOfWeek];prependedListItems++) {
            this.days.unshift('');
        }
    }

    setMonth(currentDate:Date):string{
        return this.months[currentDate.getMonth()];
    }

    getNumberOfDaysInCurrentMonth(currentDate: Date): number{
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }

    monthSelected(directionOfChange:string):string {
        if (directionOfChange === 'prev') {
            return 'prev';
        } else if (directionOfChange === 'next') {
            return 'next';
        } 

    }

    isLastMonth():boolean{
        if (this.currentDate.getMonth() === 11) {
            return true;
        } 
        return false;
    }


    isFirstMonthMonth():boolean{
        if (this.currentDate.getMonth() === 0) {
            return true;
        } 
        return false;
    }

    increaseYear():void{
         this.currentDate.setMonth(0);
         this.month = this.months[this.currentDate.getMonth()]
         ++this.year;

    }

     decreaseYear():void{
         this.currentDate.setMonth(11);
         this.month = this.months[this.currentDate.getMonth()];
         --this.year;
     }
     
     decreaseMonth():void{
        let month:number  = this.currentDate.getMonth() - 1;
        this.month = this.months[month]
        this.currentDate.setMonth(month);
     }

    increaseMonth():void{
       let month:number  = this.currentDate.getMonth() + 1;
       this.month = this.months[month]
       this.currentDate.setMonth(month);
     }
    

    changeDate(event):void{
        let directionOfChange:string = event.target.className ;

        if (this.monthSelected(directionOfChange) === 'prev') {

            if (this.isFirstMonthMonth()) {
               this.decreaseYear();
            } else {
               this.decreaseMonth();
            }   

        } else if (this.monthSelected(directionOfChange) === 'next') {
             
             if (this.isLastMonth()) {
               this.increaseYear();
            } else {
                this.increaseMonth();
            }   
        }
       this.updateDays();
    }

    updateDays():void{
        this.days = null;
        let days = this.getNumberOfDaysInCurrentMonth( this.currentDate);
        this.days = Array.from(Array(days).keys()).map(i => i +1);
        this.initDayOdWeek();
    }

    ngOnInit(): void {
        this.initDate();    
    }

    getCurrentKey():string{
        return this.currentDate.toString().slice(4,15).replace(/ +/g, "");
    }

    initDate():void{
        this.currentDate = new Date();
        this.currentDay =  this.currentDate.getDate();
        this.year =  this.currentDate.getFullYear();
        console.log( this.currentDate)
        this.month = this.setMonth( this.currentDate);
        let days = this.getNumberOfDaysInCurrentMonth( this.currentDate);
        this.days = Array.from(Array(days).keys()).map(i => i +1);
        this.currentKey = this.getCurrentKey();
        this.initDayOdWeek();
    }

    dayClicked($event):void{
        let activeDay = document.getElementsByClassName('selected');
        activeDay[0].className = '';
        $event.target.className = 'selected';
        this.currentDay = $event.target.innerText;
        this.currentDate.setDate(this.currentDay);
        this.currentKey = this.currentKey = this.getCurrentKey();
        this.currentKey.trim();
        console.log(this.currentDay);
        console.log(this.currentKey);
        // this.days = JSON.parse(localStorage.getItem(this.currentKey));
        console.log(this.days);
    }

}