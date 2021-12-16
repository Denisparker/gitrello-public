import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { Octokit } from '@octokit/core'
import { SET_LABELS } from './types'

export default function getIssues(): ThunkAction<
  Promise<void>,
  stateValue,
  unknown,
  AnyAction
> {
  return async (dispatch, getState) => {
    const entry = 'getLabels'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))
    const octokit = new Octokit()

    const labels = await octokit
      .request('GET /repos/{owner}/{repo}/labels', {
        owner: getState().repo.owner,
        repo: getState().repo.repo,
      })
      .catch((err) => console.log(err))

    dispatch({
      type: SET_LABELS,
      payload: labels?.data,
    })

    dispatch(removeLoading(entry))
  }
}
