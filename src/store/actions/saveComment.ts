import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, getComments, removeError, removeLoading } from '.'
import { Octokit } from '@octokit/core'
import { SET_COMMENTS, SET_ISSUES } from './types'

export default function updateIssueLabel(
  comment: string
): ThunkAction<Promise<void>, stateValue, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const entry = 'saveComment'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))
    if (comment !== '') {
      const currentState = getState()

      const updatedComments = [
        ...currentState.comments,
        {
          user: { avatar_url: getState().user?.data?.avatar_url },
          node_id: Math.random().toString(),
          body: comment,
        },
      ]

      dispatch({ type: SET_COMMENTS, payload: updatedComments })

      const updatedIssues = currentState.issues
      updatedIssues.map((i) =>
        i.url === getState().currentIssue?.url ? (i.comments += 1) : i
      )

      dispatch({ type: SET_ISSUES, payload: updatedIssues })

      const octokit = new Octokit({
        auth: localStorage.getItem('accessToken') || '',
      })

      const update = await octokit
        .request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
          owner: getState().repo.owner,
          repo: getState().repo.repo,
          issue_number: getState().currentIssue?.number,
          body: comment,
        })
        .catch(() =>
          dispatch({
            type: SET_ISSUES,
            payload: currentState.issues,
          })
        )
    }

    dispatch(removeLoading(entry))
  }
}
