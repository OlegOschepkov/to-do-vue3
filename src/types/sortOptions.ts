type SortOption = {
  value: string,
  label: string
}

const defaultSortOptions: SortOption[] = [
  {
    value: '',
    label: 'Без сортировки'
  },
  {
    value: 'title',
    label: 'По названию'
  },
  {
    value: 'date',
    label: 'По дате'
  },
  {
    value: 'importance',
    label: 'По важности'
  },
]

export { defaultSortOptions, SortOption }
