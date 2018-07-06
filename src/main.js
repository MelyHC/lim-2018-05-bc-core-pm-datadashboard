//Funcion display para index.html
mostrar = () => {
  document.getElementById("seccion-alumnas").style.display = 'none';    //esto sirve para que GENERAL SEA CLICKEABLE
}
const gen = document.getElementById('general'); //VARIABLE EVENTO CLICK GENERAL
const al = document.getElementById('alumnas');  // VARIABLE EVENTO CLICK ALUMNA

gen.addEventListener("click", () => {
  document.getElementById("seccion-general").style.display = 'inline-block';
  mostrar();
});

al.addEventListener("click", () => {
  document.getElementById("seccion-alumnas").style.display = 'inline-block';
  document.getElementById("seccion-general").style.display = 'none';
});
console.log(0 * 100 / 4)

//Función y condiciones para usuario y contraseña de inicio.html
validar = () => {
  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;

  if (usuario == "alejandralima" && contraseña == "12345") {
    location.href = "../src/index.html";       //propiedad para direccionar a un link
  }
  else {
    alert("Usuario y/o contraseña inválidos. Por favor verifique sus datos.");
  }
}

const chooseCountry = document.getElementById("country");
const chooseCohort = document.getElementById("cohort");
const nombreUsuarios = document.getElementById('nombre');
const searchUser = document.getElementById('boxSearch');
const studentsOrderBy= document.getElementById('orderBy');
const studentsOrderDirection= document.getElementById('order');

const options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null
  },
  orderBy: '',
  orderDirection: '',
  search: ''
}

chooseCountry.addEventListener('change', () => {                 //hacemos una funcion para agrupar por paises la lista de cohorts 
  fetch('../data/cohorts.json')                                  //realizamos un fetch para obtener los datos de COHORTS.JSON
    .then(response => response.json())
    .then(myCohorts => {                                       //En myCohorts estan todos los cohorts {}
      let output = '';                                           //en output aparece la información 
      for (nameCohort of myCohorts) {                           // hacemos un for of para obtener el nombre del cohort de la lista de cohorts
        const cohortsIds = nameCohort.id;                       //creamos una nueva variable para almacenar el nombre del cohort que sera .id
        const splitCohort = cohortsIds.split('-');              //creamos una variable y la almacenamos con el resultado de la variable anterior y le colocamos .split para que coinciden los valores, será separado por el -
        if (splitCohort[0] === chooseCountry.value) {           //creamos una condicion, el valor del html debe coincidir con la posicion 0 del string separada por -
          output +=
            `<option disabled selected hidden>Escoge tu cohort</option>
          <option value =${cohortsIds}>${cohortsIds}</option>`;       //
        }
      }
      chooseCohort.innerHTML = output;                                                     //
    })
})

chooseCohort.addEventListener('change', () => {                           //creamos una funcion para obtener  
  fetch('../data/cohorts.json')
    .then(response => response.json())
    .then(selectCohort => {
      selectCohort.forEach(objectCohortSelect => {
        if (objectCohortSelect.id === chooseCohort.value) {
          options.cohort = objectCohortSelect;
          console.log(options);
        }
      });
    })
  fetch(`../data/cohorts/${chooseCohort.value}/users.json`)          //realizamos un fetch para obtener los datos de USERS.JSON   //
    .then(response => response.json())
    .then(arrUsers => {                                                   //obtenemos a los usuarios {}                                       
      let output = '';                                                   //en output aparece la información de usuarios
      output += '<tr>';                                                  // creamos una tabla 
      output += '<th> Nombres </th>';                                    //+=
      output += '<th> General % </th>';
      output += '<th> Ejercicios % </th>';
      output += '<th> Quiz % </th>';
      output += '<th> Score Quiz </th>';
      output += '<th> Promedio Quiz </th>';
      output += '<th> Lecturas % </th>';
      output += '</tr>'

      fetch(`../data/cohorts/${chooseCohort.value}/progress.json`)   // 
        .then(response => response.json())
        .then(objectProgress => { //obtenemos el progreso de las estudiantes
          options.cohortData.users = arrUsers;
          options.cohortData.progress = objectProgress;
          let usersWithProgress = processCohortData(options);
          //console.log(usersWithProgress);
          usersWithProgress.forEach(students => {                       //hacemos un recorrido de los usuarios                             
            if (students.role === 'student') {
              output += '<tr>';
              output += '<td id= "nombrestabla">' + students.name + '</td>';
              output += '<td>' + students.stats.percent + '</td > ';
              output += '<td>' + students.stats.exercises.percent + '</td>';
              output += '<td>' + students.stats.quizzes.percent + '</td>';
              output += '<td>' + students.stats.quizzes.scoreSum + '</td>';
              output += '<td>' + students.stats.quizzes.scoreAvg + '</td>';
              output += '<td>' + students.stats.reads.percent + '</td>';
              output += '</tr>';

            }
          })
          nombreUsuarios.innerHTML = output;
        })
    }) 
})



searchUser.addEventListener('keyup', () => {
  options.search = searchUser.value;
  let usersWithProgress = processCohortData(options);
  let output3 = '';
  output3 += '<tr>';                                                  // creamos una tabla 
  output3 += '<th> Nombres </th>';                                    //+=
  output3 += '<th> General % </th>';
  output3 += '<th> Ejercicios % </th>';
  output3 += '<th> Quiz % </th>';
  output3 += '<th> Score Quiz </th>';
  output3 += '<th> Promedio Quiz </th>';
  output3 += '<th> Lecturas % </th>';
  output3 += '</tr>'
  usersWithProgress.forEach(students => {                       //hacemos un recorrido de los usuarios                             
    if (students.stats) {
      output3 += '<tr>';
      output3 += '<td id= "nombrestabla">' + students.name + '</td>';
      output3 += '<td>' + students.stats.percent + '</td > ';
      output3 += '<td>' + students.stats.exercises.percent + '</td>';
      output3 += '<td>' + students.stats.quizzes.percent + '</td>';
      output3 += '<td>' + students.stats.quizzes.scoreSum + '</td>';
      output3 += '<td>' + students.stats.quizzes.scoreAvg + '</td>';
      output3 += '<td>' + students.stats.reads.percent + '</td>';
      output3 += '</tr>';
    }
  })
  nombreUsuarios.innerHTML = output3;
})

studentsOrderBy.addEventListener('change', ()=>{
    studentsOrderDirection.addEventListener('change', ()=>{
      options.orderBy=studentsOrderBy.value;
      options.orderDirection=studentsOrderDirection.value;
      let usersWithProgress = processCohortData(options);
      let output3 = '';
      output3 += '<tr>';                                                  // creamos una tabla 
      output3 += '<th> Nombres </th>';                                    //+=
      output3 += '<th> General % </th>';
      output3 += '<th> Ejercicios % </th>';
      output3 += '<th> Quiz % </th>';
      output3 += '<th> Score Quiz </th>';
      output3 += '<th> Promedio Quiz </th>';
      output3 += '<th> Lecturas % </th>';
      output3 += '</tr>'
      usersWithProgress.forEach(students => {                       //hacemos un recorrido de los usuarios                             
        if (students.stats) {
          output3 += '<tr>';
          output3 += '<td id= "nombrestabla">' + students.name + '</td>';
          output3 += '<td>' + students.stats.percent + '</td > ';
          output3 += '<td>' + students.stats.exercises.percent + '</td>';
          output3 += '<td>' + students.stats.quizzes.percent + '</td>';
          output3 += '<td>' + students.stats.quizzes.scoreSum + '</td>';
          output3 += '<td>' + students.stats.quizzes.scoreAvg + '</td>';
          output3 += '<td>' + students.stats.reads.percent + '</td>';
          output3 += '</tr>';
        }
      })
      nombreUsuarios.innerHTML = output3;
    })
})