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
function validar()
{
const usuario = document.getElementById("usuario").value;
const contraseña = document.getElementById("contraseña").value;

if(usuario== "alejandralima" && contraseña == "12345")
{
    location.href ="http://127.0.0.1:5500/src/index.html";       //propiedad para direccionar a un link
}
else
{
    alert("Usuario y/o contraseña inválidos. Por favor verifique sus datos.");
}
}

  const chooseCountry = document.getElementById("country");
  const chooseCohort = document.getElementById("cohort");
  const nombreUsuarios = document.getElementById('nombre');
  const usersAscendente = document.getElementById("");
  const usersDescendente = document.getElementById("");


  let userId = '';
  let userName = '';
  

  chooseCountry.addEventListener("change", () => {
    fetch('../data/cohorts.json')
      .then((response) => response.json())
      .then((myCohorts) => {
        let output = '';

        for (nameCohort of myCohorts) {
          const cohortsIds = nameCohort.id;
          const splitCohort = cohortsIds.split('-');
          if (splitCohort[0] === chooseCountry.value) {
            output += '<option value="' + cohortsIds + '">' + cohortsIds + '</option>';
          }
        }
        chooseCohort.innerHTML = output;
      })
  })

  chooseCohort.addEventListener('change', () => {
    fetch('../data/cohorts/' + chooseCohort.value + '/users.json')
      .then((response) => response.json())
      .then((users) => {
        const myUser= users;
        let output = '';
        
        output += '<tr>';
        output += '<th> Nombres </th>';
        output += '<th> General % </th>';
        output += '<th> Ejercicios % </th>';
        output += '<th> Quiz % </th>';
        output += '<th> Lecturas % </th>';
        output += '</tr>'


        //funcion sort para orden ascendente
        
        const sortUsersAscendent = users.sort((a,b) => {
          if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
            console.log(sortUsersAscendent)
        })


        //funcion sort para orden descendente

        const sortUsersDescendent = users.sort((a,b) => {
          if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
            console.log(sortUsersDescendent)
        })












        
        fetch('../data/cohorts/' + chooseCohort.value + '/progress.json')
          .then((response) => response.json())
          .then((myProgress) => {
            for (i = 0; i < users.length; i++) {
              if (users[i].role === "student") {
                output += '<tr>';
                output += '<td id= "nombrestabla">' + users[i].name + '</td>';
                if (myProgress.hasOwnProperty(users[i].id)) {
                  const progressUser = myProgress[users[i].id];
                  console.log(progressUser);
                  const courses = Object.keys(progressUser);
                  //console.log(courses);
                  courses.forEach((course)=>{
                   // console.log(course);
                    const courseElements = Object.keys(progressUser[course]);
                    //console.log(courseElements);
                    courseElements.forEach((element)=>{
                     // console.log(progressUser[course].percent);
                      //console.log(progressUser[course].units);
                      const subject = Object.keys(progressUser[course].units);
                      //console.log(Object.keys(progressUser[course].units));
                      subject.forEach((elementSubject)=>{
                          //console.log(progressUser[course].units[elementSubject].parts);
                          let contadorTotalReads = 0;
                          let contadorActualReads = 0;
                          let contadorTotalExercises = 0;
                          let contadorActualExercises = 0;
                          let contadorTotalQuizzes = 0;
                          let contadorActualQuizzes = 0;
                          for (let part in progressUser[course].units[elementSubject].parts){
                            if (progressUser[course].units[elementSubject].parts[part].type=== 'read') {
                                contadorTotalReads++;
                                if(progressUser[course].units[elementSubject].parts[part].completed=== 1) {
                                  contadorActualReads++;
                                }
                              }
                            if (progressUser[course].units[elementSubject].parts[part].type=== 'practice'){
                                contadorTotalExercises++;
                                
                               // console.log(part);
                                 if(progressUser[course].units[elementSubject].parts[part].completed !== 0 && progressUser[course].units[elementSubject].parts[part].exercises){
                                   contadorActualExercises++;
                                // }
                            } 
                            
                            }
                        //console.log(contadorTotalReads);
                       // console.log(contadorActualReads);
                        //console.log(contadorActualExercises);
                      }})
                    })
                  })

                  // if (course) {
                  //   const 
                  //   // const intro = progressUser.intro;
                  //   // const unitIntroduction = intro.units['01-introduction'];
                  //   // const unitVariables = intro.units['02-variables-and-data-types'];
                  //   // const unitUx = intro.units['03-ux-design'];
                  //   // const resultadoExecises = unitVariables.parts['06-exercises'].completed;
                  //   // const resultadoQuiz = unitIntroduction.parts['04-quiz'].completed + unitVariables.parts['05-quiz'].completed + unitUx.parts['03-quiz'].completed;
                  //   // const resultadoLecturas = unitIntroduction.parts['00-welcome-and-orientation'].completed + unitIntroduction.parts['01-growth-mindset'].completed + unitIntroduction.parts['02-why-learn-to-code'].completed + unitIntroduction.parts['03-your-first-website'].completed + unitVariables.parts['00-values-data-types-and-operators'].completed + unitVariables.parts['01-variables'].completed + unitVariables.parts['02-self-learning-MDN'].completed + unitVariables.parts['03-comments'].completed + unitUx.parts['00-development-team'].completed + unitUx.parts['01-ux-design'].completed + unitUx.parts['02-ux-design-vs-ui-design'].completed;
                  //   // if (intro.hasOwnProperty('percent')) {
                  //   //   output += '<td>' + intro.percent + '</td>';
                  //   //   output += '<td>' + resultadoExecises * 100 + '</td>';
                  //   //   output += '<td>' + parseInt(resultadoQuiz * 100 / 3) + '</td>';
                  //   //   output += '<td>' + parseInt(resultadoLecturas * 100 / 11) + '</td>';
                  //   //   output += '</tr>';
                  //   // }
                  // } else {
                  //   output += '<td>-</td>';
                  //   output += '<td>-</td>';
                  //   output += '<td>-</td>';
                  //   output += '<td>-</td>';
                  //   output += '</tr>';
                  // }
                }
              }
            }
            nombreUsuarios.innerHTML = output;
          })
      })      
  })
