let age = document.getElementById('age');
function showUser(surname, name) {
	alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}
showUser.call(age, ["Igor", "Smith"]);

        //request.setRequestHeader ('Content-type', 'application/json; charset=utf-8'); // JSON form
        

        
        // let obj = {};   // преобразование данных в читаемый объект
        // formData.forEach(function(value, key) {
        //     obj[key] = value;
        // });
        // let json = JSON.stringify(obj);
        // request.send(json);




        contactForm.addEventListener('submit', function(event){
                event.preventDefault();
                contactForm.appendChild(statusMassage);
                let contactFormData = new FormData(contactForm);
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
            
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