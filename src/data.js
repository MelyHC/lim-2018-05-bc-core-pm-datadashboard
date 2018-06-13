let nombreUsuarios = document.getElementById('nombre');
let cohorts = document.getElementById('cohorts')

fetch('http://127.0.0.1:5500/data/cohorts.json')
  .then((response) => {
   return response.json();
  })
  .then((myCohort) => {
    let nombreCohort = '';
    for(i = 0; i < myCohort.length; i++) {
      nombreCohort += '<option value="' + myCohort[i].id + '">' + myCohort[i].id + '</option>';
    }
    cohorts.innerHTML = nombreCohort 
    cohorts.addEventListener('change', () => {
      fetch('http://127.0.0.1:5500/data/cohorts/'+ cohorts.value +'/users.json')
        .then((response) => {
          return response.json();
        })
        .then((myUser) => {
          let caracter = '';
          caracter += '<tr>';
          caracter += '<th>Nombres</th>';
          caracter += '<th>Ejercicios</th>';
          caracter += '<th>Quiz</th>';
          caracter += '<th>Lecturas</th>';
          caracter += '</tr>'
          fetch('http://127.0.0.1:5500/data/cohorts/'+ cohorts.value +'/progress.json')
            .then((response) => {
              return response.json();
            })
            .then((myProgress) => {
              let progresoIds = '';
              for (let idsNombre in myProgress) {
                progresoIds += '  ' +idsNombre;
              }
              console.log(progresoIds); 
              for(i = 0; i < myUser.length; i++) {
                caracter += '<tr>';
                caracter += '<td>' +  myUser[i].name  + '</td>'  ;
                if(progresoIds === myUser[i].id) {
                  caracter += '<td>bien funciona</td>';
                  caracter += '</tr>';
                }
              }
              nombreUsuarios.innerHTML = caracter
            })
        })
    })
  })