import { Octokit } from 'octokit'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_USER } from './types'

export default function getUser(): ThunkAction<
  Promise<void>,
  stateValue,
  unknown,
  AnyAction
> {
  return async (dispatch) => {
    const entry = 'getUser'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    const octokit = new Octokit({ auth: localStorage.getItem('accessToken') })

    octokit
      .request('GET /user')
      .then(({ data }) =>
        dispatch({
          type: SET_USER,
          payload: { data },
        })
      )
      .catch((err) => {
        if (err.status === 401) {
          localStorage.removeItem('accessToken')
          dispatch({
            type: SET_USER,
            payload: null,
          })
        }
      })
      .finally(() => dispatch(removeLoading(entry)))
  }
}
