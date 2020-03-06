window.computeUsersStats = (users, progress, courses) => {

  users.map(user => {

    const userId = user.id;
    const progressUser = progress[userId];
    const { exercises, reads, quizzes } = user.stats = {
      percent: 0,
      exercises: {
        total: 0,
        completed: 0,
        percent: 0
      },
      reads: {
        total: 0,
        completed: 0,
        percent: 0
      },
      quizzes: {
        total: 0,
        completed: 0,
        percent: 0,
        scoreSum: 0,
        scoreAvg: 0
      },
    };

    courses.forEach(nameCourses => {

      if (progressUser.hasOwnProperty(nameCourses)) {

        user.stats.percent += progressUser[nameCourses].percent;

        const arrUnitsValues = Object.values(progressUser[nameCourses].units);

        arrUnitsValues.forEach(elementUnitsValues => {
          const partsElements = Object.values(elementUnitsValues.parts);
          partsElements.forEach(part => {

            if (part.type === 'read') {
              reads.total++;

              if (part.completed === 1) {
                reads.completed++;
              }
            }
            if (part.type === 'practice' && part.hasOwnProperty("exercises")) {

              const arrContadorExercises = Object.keys(part.exercises);

              exercises.total += arrContadorExercises.length;
              exercises.completed += part.completed;
            }
            if (part.type === 'quiz') {
              quizzes.total++;

              if (part.completed === 1 && part.hasOwnProperty("score")) {
                quizzes.completed++;
                quizzes.scoreSum += part.score;
              }
            }
          });
        });

        exercises.percent = Math.round(exercises.completed * 100);
        reads.percent = Math.round(reads.completed * 100 / reads.total);
        quizzes.percent = Math.round(quizzes.completed * 100 / quizzes.total);
        quizzes.scoreAvg = Math.round(quizzes.scoreSum / quizzes.total);
      }
    });
    return user;
  });
  return users;
};

window.sortUsers = (users, orderBy, orderDirection) => {

  let usersSort = users;

  if (orderDirection.length !== 0) {

    usersSort = users.sort((a, b) => {

      if (orderBy === "name")
        return a.name.localeCompare(b.name);

      else if (orderBy === "percent")
        return a.stats[orderBy] - b.stats[orderBy];

      else if (orderBy === "exercises" || orderBy === "quizzes" || orderBy === "reads")
        return a.stats[orderBy].percent - b.stats[orderBy].percent;

      else if (orderBy === "scoreSum" || orderBy === "scoreAvg")
        return a.stats.quizzes[orderBy] > b.stats.quizzes[orderBy];

    })
    if (orderDirection === "DESC") {
      usersSort = usersSort.reverse();
    }
  }
  return usersSort;
}

window.filterUsers = (users, search) => {

  let usersFilter = users;
  search = search.toLowerCase();

  usersFilter = users.filter(user => user.name.toLowerCase().indexOf(search) >= 0);

  return usersFilter;
}

window.processCohortData = (options) => {

  const coursesCohort = Object.keys(options.cohort.coursesIndex);
  const usersStats = computeUsersStats(options.cohortData.users, options.cohortData.progress, coursesCohort);
  const orderUsers = sortUsers(usersStats, options.orderBy, options.orderDirection);
  const usersFilter = filterUsers(orderUsers, options.search);

  return usersFilter;
}