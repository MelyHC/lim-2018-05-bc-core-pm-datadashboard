//Funcion display para index.html
function mostrar() {
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


//Función y condiciones para usuario y contraseña de inicio.html
function validar() {
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



let userId = '';
let userName = '';


chooseCountry.addEventListener("change", () => {                 //hacemos una funcion para agrupar por paises la lista de cohorts 
  fetch('../data/cohorts.json')                                  //realizamos un fetch para obtener los datos de COHORTS.JSON
    .then((response) => response.json())
    .then((myCohorts) => {                                       //En myCohorts estan todos los cohorts {}
      let output = '';                                           //en output aparece la información 
    

      for (nameCohort of myCohorts) {                           // hacemos un for of para obtener el nombre del cohort de la lista de cohorts
        const cohortsIds = nameCohort.id;                       //creamos una nueva variable para almacenar el nombre del cohort que sera .id
        const splitCohort = cohortsIds.split('-');              //creamos una variable y la almacenamos con el resultado de la variable anterior y le colocamos .split para que coinciden los valores, será separado por el -
        if (splitCohort[0] === chooseCountry.value) {           //creamos una condicion, el valor del html debe coincidir con la posicion 0 del string separada por -
          output += '<option value="' + cohortsIds + '">' + cohortsIds + '</option>';       //
        }
      }
      chooseCohort.innerHTML = output;                                                     //
    })
})

chooseCohort.addEventListener('change', () => {                           //creamos una funcion para obtener          
  fetch('../data/cohorts/' + chooseCohort.value + '/users.json')          //realizamos un fetch para obtener los datos de USERS.JSON   //
    .then((response) => response.json())
    .then((users) => {                                                   //obtenemos a los usuarios {}                                       
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

      fetch('../data/cohorts/' + chooseCohort.value + '/progress.json')   // 
        .then((response) => response.json())
        .then((myProgress) => {                                           //obtenemos el progreso de las estudiantes
          for (i = 0; i < users.length; i++) {                            //hacemos un recorrido de los usuarios                             
            if (users[i].role === "student") {                            // creamos una condicion para obtener a los que tienen role student   //
              output += '<tr>';
              output += '<td id= "nombrestabla">' + users[i].name + '</td>';   
              if (myProgress.hasOwnProperty(users[i].id)) {
                const progressUser = myProgress[users[i].id];
                //console.log(progressUser);
                const courses = Object.keys(progressUser);
                //console.log(courses);
                if (courses.length !== 0) {
                  let scorePercent = 0;
                  let contadorTotalQuizzes = 0;
                  let contadorActualQuizzes = 0;
                  let contadorTotalReads = 0;
                  let contadorActualReads = 0;
                  let contadorTotalExercises = 0;
                  let contadorActualExercises = 0;
                  let contadorScoreSum = 0;
                  courses.forEach((course) => {
                    scorePercent = progressUser[course].percent;
                    //console.log(element);
                    const subject = Object.keys(progressUser[course].units);
                    //console.log(Object.keys(progressUser[course].units));
                    subject.forEach((elementSubject) => {
                      const unitsElements = progressUser[course].units[elementSubject].parts

                      for (let part in unitsElements) {
                        //console.log(part);
                        if (unitsElements[part].type === 'read') {
                          contadorTotalReads++;
                          if (unitsElements[part].completed === 1) {
                            contadorActualReads++;
                          }
                          // }
                        }
                        if (unitsElements[part].type === 'practice' && unitsElements[part].hasOwnProperty("exercises")) {
                          //console.log(progressUser[course].units[elementSubject].parts[part].completed)
                          contadorActualExercises = unitsElements[part].completed;
                          const arrContadorExercises = Object.keys(unitsElements[part].exercises);
                          contadorTotalExercises = arrContadorExercises.length
                        }
                        if (unitsElements[part].type === 'quiz') {
                          contadorTotalQuizzes++;
                          if (unitsElements[part].completed === 1 && unitsElements[part].hasOwnProperty("score")) {
                            contadorActualQuizzes++;
                            contadorScoreSum += unitsElements[part].score;
                          }

                          //console.log(progressUser[course].units[elementSubject].parts[part].completed)                            
                        }
                      }
                    })
                  })   
                  output += '<td>' + scorePercent + '</td>'
                  output += '<td>' + contadorActualExercises * 100 + '</td>';
                  output += '<td>' + parseInt(contadorActualQuizzes * 100 / contadorTotalQuizzes) + '</td>';
                  output += '<td>' + contadorScoreSum + '</td>';
                  output += '<td>' + parseInt(contadorScoreSum / contadorTotalQuizzes) + '</td>';
                  output += '<td>' + parseInt(contadorActualReads * 100 / contadorTotalReads) + '</td>';
                  output += '</tr>';
                } else {
                  output += '<td>-</td>';
                  output += '<td>-</td>';
                  output += '<td>-</td>';
                  output += '<td>-</td>';
                  output += '<td>-</td>';
                  output += '<td>-</td>';
                  output += '</tr>';
                }

              }
            }
          }
          nombreUsuarios.innerHTML = output;
        })
    })
})