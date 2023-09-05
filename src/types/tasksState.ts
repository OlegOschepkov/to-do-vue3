import { Task } from '@/types/task';
import { SortOption } from '@/types/sortOptions';

interface TasksState {
  tasks: Task[],
  completedTasks: Task[],
  taskId: string,
  selectedSort: string,
  searchQuery: string,
  isLoading: boolean,
  isError: boolean,
  isRouted: boolean,
  sortOptions: SortOption[]
}

export default TasksState
