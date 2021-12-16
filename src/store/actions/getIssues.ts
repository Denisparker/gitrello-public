import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addError, addLoading, getLabels, removeError, removeLoading } from '.'
import { Octokit } from '@octokit/core'
import { SET_ISSUES, SET_REPO, SET_USER } from './types'

export default function getIssues(
  url?: string
): ThunkAction<Promise<void>, stateValue, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const entry = 'getIssues'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))
    const octokit = new Octokit()
    if (url) {
      if (url.match(/(?:git@|https:\/\/)github.com[:/](.*)./g)) {
        const newUrl = url.split('/')
        const index = newUrl.findIndex((i) => i === 'github.com')
        const req = {
          owner: newUrl[index + 1],
          repo: newUrl[index + 2],
        }
        dispatch({
          type: SET_REPO,
          payload: req,
        })
        const admin = req.owner === getState().user?.data?.login
        dispatch({
          type: SET_USER,
          payload: { ...getState().user, admin },
        })
        dispatch(getLabels())
      }

      const issues = await octokit
        .request('GET /repos/{owner}/{repo}/issues', {
          owner: getState().repo.owner,
          repo: getState().repo.repo,
        })
        .catch(() => {
          dispatch(
            addError({ [entry]: 'Выбранного репозитория не существует' })
          )
        })

      const data = issues?.data
      if (issues) {
        dispatch({
          type: SET_ISSUES,
          payload: data,
        })
      }
    } else {
      dispatch(addError({ [entry]: 'Некорректная ссылка' }))
    }
    dispatch(removeLoading(entry))
  }
}
