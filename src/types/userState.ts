interface UserState {
  user: {
    data: object
  },
  error: {
    isError: boolean,
    errorCode: string
  },
  isLoading: boolean
}

export default UserState
