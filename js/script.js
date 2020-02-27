window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function ShowTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for ( let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    ShowTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer

    let deadLine = '2020-06-31';

    function getTimeRemaining (endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60), //получение целых чисел вместо дробных
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)) % 24),
        days = Math.floor((t/(1000*3600*24)) % 30),
        month = Math.floor(t/(1000*3600*24*30));

        return {
            'total' : t,
            'month' : month,
            'days'  : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function stClock(id, endtime) {
        let timer = document.getElementById(id),
            month = timer.querySelector('.month'),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRemaining(endtime);
            month.textContent = (t.month < 1) ? " ": t.month + "M";
            days.textContent = (t.days < 1) ? " ": t.days + "D";
            hours.textContent = (t.hours >= 10) ? t.hours : "0" + t.hours;
            minutes.textContent = (t.minutes >= 10) ? t.minutes : "0" + t.minutes;
            seconds.textContent = (t.seconds >= 10) ? t.seconds : "0" + t.seconds;
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                month.textContent = ' ';
                days.textContent = ' ';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    stClock('timer', deadLine);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let descriptionBtn = document.querySelectorAll('.description-btn');
        descriptionBtn.forEach(element => {
           element.addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });

        // From

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо скоро мы свяжимся с вами!',
        failure: 'Чтото пошло не так'
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        input = document.getElementsByTagName('input'),
        statusMassage = document.createElement('div');
        statusMassage.classList.add('status');
    
    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMassage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //request.setRequestHeader ('Content-type', 'application/json; charset=utf-8'); // JSON form

        let formData = new FormData(form);

        // let obj = {};   // преобразование данных в читаемый объект
        // formData.forEach(function(value, key) {
        //     obj[key] = value;
        // });
        // let json = JSON.stringify(obj);
        // request.send(json);

        request.send(formData);

        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4) {
                statusMassage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status ==200) {
                statusMassage.innerHTML = message.success;
            } else {
                statusMassage.innerHTML = message.failure;
            }
        });
        
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    contactForm.addEventListener('submit', function(event){
        event.preventDefault();
        contactForm.appendChild(statusMassage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let contactFormData = new FormData(contactForm);
        request.send(contactFormData);

        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4) {
                statusMassage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status ==200) {
                statusMassage.innerHTML = message.success;
            } else {
                statusMassage.innerHTML = message.failure;
            }
            statusMassage.style.color = 'gray';
        });
        
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });
});


