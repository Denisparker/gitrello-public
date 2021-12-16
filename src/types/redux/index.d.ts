declare type stateValue = {
  errors: { [key: string]: string }
  loadings: string[]
  user: { data?: Object<any>; admin: boolean } | null
  issues: any[]
  comments: any[]
  labels: any[]
  currentIssue: { [key: string]: any } | null
  repo: {repo: string, owner: string}
}
