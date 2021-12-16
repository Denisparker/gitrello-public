import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_COMMENTS } from './types'
import { Octokit } from '@octokit/core'

export default function getUser(): ThunkAction<
  Promise<void>,
  stateValue,
  unknown,
  AnyAction
> {
  return async (dispatch, getState) => {
    const entry = 'login'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    const octokit = new Octokit()

    const commentsList = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments',{
      owner: getState().repo.owner,
      repo: getState().repo.repo,
      issue_number: getState().currentIssue?.number
    }).catch((err) => console.log(err))
    
    dispatch({ type: SET_COMMENTS, payload: commentsList?.data})
    dispatch(removeLoading(entry))
  }
}
