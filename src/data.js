let nombreUsuarios = document.getElementById('nombre');
let cohorts = document.getElementById('cohorts')
/*fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  .then((response) => {
    return response.json();
  })
  .then((myProgress) => {
    //let progresoIds = '';
    for(let progresoIds in myProgress) {
      console.log(progresoIds);
    }
  })
*/
fetch('http://127.0.0.1:5500/data/cohorts.json')
 .then((response) => {
   return response.json();
 })
 .then((myCohort) => {
    let nombreCohort = '';
    for(i = 0; i < myCohort.length; i++) {
      nombreCohort += '<option value="' + myCohort[i].id + '>' + myCohort[i].id + '</option>';
    }
    cohorts.innerHTML = nombreCohort 
  
    fetch('http://127.0.0.1:5500/data/cohorts/'+ myCohort[i].id +'/users.json')
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

        for (i = 0; i < myUser.length; i++) {
          caracter += '<tr>';
          caracter += '<td>' +  myUser[i].name  + '</td>'  ;
          caracter += '</tr>';
          /*if(progresoIds === myUser[i].id) {
            caracter += '<tr>';
            caracter += '<th>bien funciona</tr>';
            caracter += '</tr>';
          }
          */
        }
        nombreUsuarios.innerHTML = caracter
      })
  })