const general = document.getElementById('general');
const students = document.getElementById('students');
const sectionStudents = document.getElementById("section-students");
const sectionGeneral = document.getElementById("section-general");
const paises = {
  lim: 'lima',

}
//Funcion ocultar
const hide = (tag) => {
  tag.classList.add('hidden');
}

const view = (tag) => {
  tag.classList.remove('hidden');
}

general.addEventListener("click", () => {
  view(sectionGeneral);
  hide(sectionStudents);
});

students.addEventListener("click", () => {
  view(sectionStudents);
  hide(sectionGeneral);
});

const chooseCountry = document.getElementById("country");
const chooseCohort = document.getElementById("cohort");
const nombreUsuarios = document.getElementById('nombre');
const searchUser = document.getElementById('boxSearch');
const studentsOrderBy = document.getElementById('orderBy');
const studentsOrderDirection = document.getElementById('order');

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

const allCohors = {
  myCohorts: null,
  users: null,
  process: null
}

const printDataInHTML = (arrForPrint, tag) => {
  let output = '';
  output +=
    `<thead class="control-scroll">
      <tr>                                                  
        <th> Nombres </th>                                  
        <th type="numeric"> General % </th>
        <th type="numeric"> Ejercicios % </th>
        <th type="numeric"> Quiz % </th>
        <th type="numeric"> Score Quiz </th>
        <th type="numeric"> Promedio Quiz </th>
        <th type="numeric"> Lecturas % </th>
      </tr>
    </thead>
    <tbody>`;

  arrForPrint.forEach(({ role, name, stats: { percent, exercises, quizzes, reads } }) => {
    if (role === "student") {
      output +=
        `<tr>
          <td id= "nombrestabla">${name}</td>
          <td>${percent}</td> 
          <td>${exercises.percent}</td>
          <td>${quizzes.percent}</td>
          <td>${quizzes.scoreSum}</td>
          <td>${quizzes.scoreAvg}</td>
          <td>${reads.percent}</td>
        </tr>`;
    }
  })
  output += '</tbody>';

  return tag.innerHTML = output;
}

const pullDataCohorts = async () => {
  return await fetch('../data/cohorts.json')
    .then(async res => await res.json())
    .catch(async err => await err)
}

pullDataCohorts()
  .then(cohorts => {
    allCohors.myCohorts = cohorts;
  })

chooseCountry.addEventListener('change', () => {
  const { myCohorts } = allCohors;
  let output = '';

  myCohorts.forEach(({ id }) => {

    const splitCohort = id.split('-');

    if (splitCohort[0] === chooseCountry.value) {
      output +=
        `<option disabled selected hidden>Escoge tu cohort</option>
        <option value="${id}">${id}</option>`;
    }
  })
  chooseCohort.innerHTML = output;
})

chooseCohort.addEventListener('change', () => {
  const { myCohorts } = allCohors;

  myCohorts.forEach(objectCohortSelect => {
    if (objectCohortSelect.id === chooseCohort.value) {
      options.cohort = objectCohortSelect;
    }
  });

  fetch(`../data/cohorts/${chooseCohort.value}/users.json`)
    .then(response => response.json())
    .then(arrUsers => {
      fetch(`../data/cohorts/${chooseCohort.value}/progress.json`)
        .then(response => response.json())
        .then(objectProgress => {
          options.cohortData.users = arrUsers;
          options.cohortData.progress = objectProgress;
          printDataInHTML(processCohortData(options), nombreUsuarios);
        })
    })
})

searchUser.addEventListener('keyup', () => {
  options.search = searchUser.value;
  printDataInHTML(processCohortData(options), nombreUsuarios);
})

studentsOrderBy.addEventListener('change', () => {
  options.orderBy = studentsOrderBy.value;
  printDataInHTML(processCohortData(options), nombreUsuarios);
})

studentsOrderDirection.addEventListener('change', () => {
  options.orderDirection = studentsOrderDirection.value;
  printDataInHTML(processCohortData(options), nombreUsuarios);
})
