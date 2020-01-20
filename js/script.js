window.addEventListener('DOMContentLoaded', () => {

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

    info.addEventListener('click', (event) => {
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
    
    more.addEventListener('click', () => {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let descriptionBtn = document.querySelectorAll('.description-btn');
        descriptionBtn.forEach(element => {
           element.addEventListener('click', () => {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Options
    
    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }
        div() {
            let footer = document.querySelector('footer'),
                txtbx = document.createElement('txtbx');
                footer.before(txtbx);
                txtbx.innerHTML = '<textarea name="text"></textarea><p><button type="submit" value="Отправить"> <button type="reset" value="Очистить"></p>';
        return this.div2();
        }
        div2() {
            submit = document.querySelector('submit');
            reset = document.querySelector('reset');
            

        }

    } 
    var options = new Options();
    options.div();
});


