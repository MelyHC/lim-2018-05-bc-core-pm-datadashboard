window.computeUsersStats = (users, progress, courses) => {
  const user = [stats= {
      percent: 0,
      exercises: {
        total: 0,
        completed: 0,
        percent: 100
      },
      reads: {
        total: 100,
        completed: 100,
        percent: 100
      },
      quizzes: {
        total: 100,
        completed: 100,
        percent: 100,
        scoreSum: 100,
        scoreAvg: 100
      }
    }  
  ]
  return user.stats
}
window.sortUsers = (users,orderBy, orderDirection) => {

}
window.filterUsers = (users, search) => {

}
window.processCohortData = (options) => {
  
}

