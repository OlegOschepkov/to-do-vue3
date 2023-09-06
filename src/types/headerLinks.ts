interface HeaderLinks {
  icon: string,
  url: string,
  text: string,
  key: number
}

const defaultHeaderLinks = [
  {
    icon: 'home-icon',
    url: '/',
    text: 'Главная страница',
    key: 123
  },
  {
    icon: 'tasks-icon',
    url: '/todo-list',
    text: 'Список задач',
    key: 321
  },
  {
    icon: 'profile-icon',
    url: '/profile',
    text: 'Профиль',
    key: 301
  }
]

export { HeaderLinks, defaultHeaderLinks }
