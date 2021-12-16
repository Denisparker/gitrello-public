import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { Octokit } from '@octokit/core'
import { SET_ISSUES } from './types'

export default function updateIssueLabel(
  url: string,
  label: string
): ThunkAction<Promise<void>, stateValue, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const entry = 'updateIssueLabel'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    const currentState = getState()
    
    const updatedIssues = currentState.issues.map((i) =>
      i.url === url
        ? {
            ...i,
            labels:
              label !== 'noneLabel'
                ? [currentState.labels.find((i) => i.url === label)] // Only one label supported
                : []
          }
        : i
    )

    dispatch({
      type: SET_ISSUES,
      payload: updatedIssues,
    })
    
    const octokit = new Octokit({auth: localStorage.getItem('accessToken') || ""})
    
    const update = await octokit
      .request('PUT /repos/{owner}/{repo}/issues/{issue_number}/labels', {
        owner: getState().repo.owner,
        repo: getState().repo.repo,
        issue_number: updatedIssues.find(i => i.url === url).number,
        labels: label !== 'noneLabel' ? [currentState.labels.find(i => i.url === label).name] : [] // Only one label supported
      })
      .catch(() => {
        dispatch({
          type: SET_ISSUES,
          payload: currentState.issues,
        })
      })

    dispatch(removeLoading(entry))
  }
}
