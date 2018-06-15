let nombreUsuarios = document.getElementById('nombre');
let cohorts = document.getElementById('cohorts')

fetch('../data/cohorts.json')
  .then((response) => {
    return response.json();
  })
  .then((myCohort) => {
    let nombreCohort = '';
    for (i = 0; i < myCohort.length; i++) {
      nombreCohort += '<option value="' + myCohort[i].id + '">' + myCohort[i].id + '</option>';
    }
    cohorts.innerHTML = nombreCohort;
    cohorts.addEventListener('change', () => {
      fetch('../data/cohorts/' + cohorts.value + '/users.json')
        .then((response) => {
          return response.json();
        })
        .then((myUser) => {
          let caracter = '';
          caracter += '<tr>';
          caracter += '<th>Nombres</th>';
          caracter += '<th>General</th>';
          caracter += '<th>Ejercicios</th>';
          caracter += '<th>Quiz</th>';
          caracter += '<th>Lecturas</th>';
          caracter += '</tr>'
          fetch('../data/cohorts/' + cohorts.value + '/progress.json')
            .then((response) => {
              return response.json();
            })
            .then((myProgress) => {
              let progresoIds = Object.entries(myProgress);
              for (i = 0; i < myUser.length; i++) {
                caracter += '<tr>';
                caracter += '<td>' + myUser[i].name + '</td>';
                if(myProgress.hasOwnProperty(myUser[i].id)) {
                  const progressUser = myProgress[myUser[i].id];
                  if(progressUser.hasOwnProperty('intro')){
                    const intro = progressUser.intro;
                    if (intro.hasOwnProperty('percent')) {
                      caracter += '<td>' + intro.percent + '</td>';
                      caracter += '</tr>';
                    } else {
                      caracter += '<td>0</td>';
                      caracter += '</tr>';
                    }
                  } else {
                    caracter += '<td>No inicio</td>';
                      caracter += '</tr>';
                  }
                }
                //console.log(progresoIntro.percent)
              }
              nombreUsuarios.innerHTML = caracter;
            })
        })
    })
  })