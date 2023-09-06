interface SortOption {
  value: string,
  label: string
}

const defaultSortOptions: SortOption[] = [
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
