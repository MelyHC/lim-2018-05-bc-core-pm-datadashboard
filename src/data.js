let nombreUsuarios = document.getElementById('contenido');
fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    let caracter = '';
    for (i = 0; i < myJson.length; i++) {
      caracter += '<p>' + 'Mi nombre es ' +  myJson[i].name  + ' mi rol es ' + myJson[i].role  + '</p>'  ;
    }
    nombreUsuarios.innerHTML = caracter
  })