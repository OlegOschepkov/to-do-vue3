interface Task {
  id: string,
  title: string,
  date: Date,
  importance: number,
  completed: boolean,
  completedAt?: Date,
  author?: string,
  access: string,
}

const taskDefaults: Pick<Task, 'completed'> = {
  completed: false
}

export {Task, taskDefaults}
