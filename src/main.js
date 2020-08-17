// import Chart from 'dist/chart.js';

const menu = document.getElementsByClassName('menu-option');

Array.from(menu).forEach((option, i, allOptions) => {

  option.addEventListener('click', (e) => {

    const { classList, id: currentOptionId } = e.currentTarget;

    allOptions.forEach(({ classList, id }) => {

      classList.remove('active');
      const { classList: sectionClassList } = document.getElementById(`section-${id}`);

      if (currentOptionId === id) sectionClassList.remove('hidden')
      else sectionClassList.add('hidden')

    })

    classList.add('active');
  })
})

const chooseCountry = document.getElementById('country');
const chooseCohort = document.getElementById('cohort');
const afterChooseCohort = document.getElementById('after-choose-cohort');
const tableUsers = document.getElementById('table-users');
const searchUser = document.getElementById('box-search');
const orderBy = document.getElementById('order-by');
const orderDirection = document.getElementById('order-direction');

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
  years: null
}

const countries = {
  lim: 'Lima',
  scl: 'Santiago de Chile',
  cdmx: 'Ciudad de México',
  gdl: 'Guadalara',
  spl: 'Sao Paulo',
  aqp: 'Arequipa'
}

const view = (tag) => {
  tag.classList.remove('hidden');
}

const pullDataCohorts = async () => {
  return await fetch('../data/cohorts.json')
    .then(async res => await res.json())
    .catch(async err => await err)
}

const pullDataUsersAndProgress = async () => {
  return await fetch(`../data/cohorts/lim-2018-03-pre-core-pw/users.json`)
    .then(async users => {
      return await fetch(`../data/cohorts/lim-2018-03-pre-core-pw/progress.json`)
        .then(async progress => {
          return {
            users: await users.json(),
            progress: await progress.json()
          }
        })
        .catch(async err => await err)
    })
    .catch(async err => await err)

}

pullDataCohorts()
  .then(cohorts => {
    allCohors.myCohorts = cohorts;
  })
  .catch(err => alert(`Hubo un error ${err}`))

const printDataTable = (arrForPrint, tag) => {
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
    if (role === 'student') {
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

chooseCountry.addEventListener('change', () => {
  const { myCohorts } = allCohors;
  let output = '';

  view(chooseCohort);

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

  view(afterChooseCohort);

  myCohorts.forEach(objectCohortSelect => {
    if (objectCohortSelect.id === chooseCohort.value)
      options.cohort = objectCohortSelect;
  });

  pullDataUsersAndProgress(chooseCohort.value)
    .then(usersAndProgress => {
      options.cohortData = usersAndProgress;

      printDataTable(processCohortData(options), tableUsers);
    })
    .catch(err => alert(`Hubo un error ${err}`));
})

searchUser.addEventListener('keyup', () => {
  options.search = searchUser.value;
  printDataTable(processCohortData(options), tableUsers);
})

orderBy.addEventListener('change', () => {
  options.orderBy = orderBy.value;
  printDataTable(processCohortData(options), tableUsers);
})

orderDirection.addEventListener('change', () => {
  options.orderDirection = orderDirection.value;
  printDataTable(processCohortData(options), tableUsers);
})

// const ctx = document.getElementById('my-stadic');

// const static = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });