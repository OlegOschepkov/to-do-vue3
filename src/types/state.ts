import Task from '@/types/task';
import SortOptions from '@/types/sortOptions';

interface State {
  tasks: Task[],
  taskId: number,
  selectedSort: string,
  searchQuery: string,
  isLoading: boolean,
  isError: boolean,
  isRouted: boolean,
  sortOptions: SortOptions
}

export default State
