import { Task } from '@/types/task';
import { SortOption } from '@/types/sortOptions';

interface State {
  user: {
    data?: object,
  },
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

export default State


// task
// user:Object
// data:Object
// accessToken:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MGI5ZGUwODBmZmFmYmZjMTgzMzllY2Q0NGFjNzdmN2ZhNGU4ZDMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicXdlcnR5IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3RvZG92dWUzcHJvamVjdCIsImF1ZCI6InRvZG92dWUzcHJvamVjdCIsImF1dGhfdGltZSI6MTY5MzQxOTkyNiwidXNlcl9pZCI6IlBuVXdwVUswZUhYUTZsSkZDaDhKRXZmZVNFajIiLCJzdWIiOiJQblV3cFVLMGVIWFE2bEpGQ2g4SkV2ZmVTRWoyIiwiaWF0IjoxNjkzNDE5OTI2LCJleHAiOjE2OTM0MjM1MjYsImVtYWlsIjoicXdlQHF3ZS5xd2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicXdlQHF3ZS5xd2UiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.W70HtUJQWxLeuAPc78kbLygAPTvnddp7kxw-psxzZFt8cVBxHdlZ6nrbcuEHEoyLZmeSECZqRvc8QkhIAQpxI0CGYy72f2w63cKIVvF4Dm-fvwBPWe4SCd5QCJJ4kyxQc_e2j-_kD9Iw0fnwppWT2JyFSI91DqQM-jCoV6uXQooB4f2AVIo4CeQgXubVpMq99uREYQKs-kDZUfHWizu3q4zHNQxZ9Mikg89VbALUsnzpy5dIngULXqwZFUDIIPE5Yk5IeDU_xb_EKuHrZPMWDW4_67dXRoBxsxIloJ3oCx95c6azZ9wViX07470CdjikEGuEuuGfdHeK08FlDy5wHw"
// auth:Object
// displayName:"qwerty"
// email:"qwe@qwe.qwe"
// emailVerified:false
// isAnonymous:false
// metadata:Object
// phoneNumber:null
// photoURL:null
// proactiveRefresh:Object
// providerData:Array[1]
// providerId:"firebase"
// reloadListener:null
// reloadUserInfo:Object
// stsTokenManager:Object
// tenantId:null
// uid:"PnUwpUK0eHXQ6lJFCh8JEvfeSEj2"
// loggedIn:true
// tasks:Array[0]
// completedTasks:Array[0]
// taskId:""
// selectedSort:""
// searchQuery:""
// isLoading:true
// isError:true
// isRouted:false
// sortOptions:Array[4]
// 0:Object
// 1:Object
// 2:Object
// 3:Object
// getSortedTasks:Array[0]
// getRouteState:false
// getTaskById:undefined
// getSortedAndSearchedActiveTasks:Array[0]
// getSortedAndSearchedCompletedTasks:Array[0]
// getUser:Object
// data:Object
// loggedIn:true
