interface Task {
  id: string,
  title: string,
  date: Date,
  importance: number,
  completed: boolean
}

const taskDefaults: Pick<Task, 'completed'> = {
  completed: false
}

export {Task, taskDefaults}
