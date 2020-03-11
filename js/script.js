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
    
        function sendForm(form){
            form.addEventListener('submit', function(event){
                event.preventDefault();
                form.appendChild(statusMassage);
                let formData = new FormData(form);

                function postData() {
                    return new Promise(function(resolve, reject) {     //возврат Обещаний без создание переменных
                        let request = new XMLHttpRequest();
                            request.open('POST', 'server.php');
                            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                            request.addEventListener('readystatechange', function(){
                                if (request.readyState < 4) {
                                resolve();
                                } else if(request.readyState === 4 && request.status ==200) {
                                resolve();
                                } else {
                                reject();
                                }
                            });
                        request.send(formData);
                    });

                }
                function clearInput () {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }
                postData(formData)
                .then(() => statusMassage.innerHTML = message.loading)
                .then(() => statusMassage.innerHTML = message.success)  
                .catch(() => statusMassage.innerHTML = message.failure)
                .then (clearInput);   
            });
            contactForm.addEventListener('submit', function(event){
                event.preventDefault();
                contactForm.appendChild(statusMassage);
                let contactFormData = new FormData(contactForm);

                function postData() {
                    return new Promise(function(resolve, reject) {     //возврат Обещаний без создание переменных
                        let request = new XMLHttpRequest();
                            request.open('POST', 'server.php');
                            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                            request.addEventListener('readystatechange', function(){
                                if (request.readyState < 4) {
                                resolve();
                                } else if(request.readyState === 4 && request.status ==200) {
                                resolve();
                                } else {
                                reject();
                                }
                            });
                        request.send(contactFormData);
                    });

                }
                function clearInput () {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }
                postData(contactFormData)
                .then(() => statusMassage.innerHTML = message.loading)
                .then(() => statusMassage.innerHTML = message.success)  
                .catch(() => statusMassage.innerHTML = message.failure)
                .then (clearInput);   
            });
        }

    
    sendForm(form);
    sendForm(contactForm);


    // Slider
    
    let slideIndex = 1, //параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    
    showSlides(slideIndex); //cтавим в начале для того что бы работал сразу первый слайд

    function showSlides (n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length; //проверка с индексем слайда 
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // } аналог фор ич
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides (n) {
        showSlides(slideIndex += n); //что бы сразу менять индекс слайда мы вызываем функцию
    }

    function currentSlide(n) {
        showSlides(slideIndex = n); // определение текущего слайда и его установка (точки)
    }

    prev.addEventListener( 'click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i-1]) { //дилигирование точек
                currentSlide(i);
            }
        }
    });
});
