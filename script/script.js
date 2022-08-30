 window.addEventListener('DOMContentLoaded', function(){
'use strict';

    //Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            idInterval = null;


        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),           
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.ceil(timeRemaining % 60),
                minutes = Math.ceil((timeRemaining / 60) % 60),
                hours = Math.ceil(timeRemaining / 60 / 60);
                    if (timeRemaining <= 0){
                        seconds = '0',
                        minutes = '0',
                        hours = '0'
                    } 
                return{timeRemaining, hours, minutes, seconds};  
        }
        
        function updateClock(){
            let timer = getTimeRemaining();
                timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
                timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
                timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;    
                idInterval = setInterval(updateClock, 1000);
                if (timer.timeRemaining <= 0){
                clearInterval(idInterval)
        };      
        }
        
        
            updateClock();
    }
         
    countTimer('9 august 2022'); 
    
});
