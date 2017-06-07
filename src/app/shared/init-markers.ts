export class Init{
    load():void{
        if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
            console.log('No markers found ...creating');
            let markers = [
                {
                name :'Location Three',
                latitude:51.678418,
                longitude: 7.809007,
                draggable: true
                },

                {
                name :'Location Three',
                latitude:51.678418,
                longitude: 9.809007,
                draggable: true
                },

                {
                name :'Location Three',
                latitude:51.678418,
                longitude: 4.809007,
                draggable: true
                }
            ];
            localStorage.setItem('markers', JSON.stringify(markers));
        } else {
            console.log('loading markers');
        }
        

    }

}