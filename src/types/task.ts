interface Task {
  id: string,
  title: string,
  date: Date,
  importance: number,
  completed?: boolean,
  completedAt?: Date,
  author?: {
    uid: string,
    displayName: string
  },
  access: string,
}

const taskDefaults: Pick<Task, 'completed'> = {
  completed: false
}

export {Task, taskDefaults}
