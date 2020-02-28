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