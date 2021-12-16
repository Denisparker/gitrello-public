import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addError, addLoading, removeError, removeLoading } from '.'
import { SET_USER } from './types'

export default function login(
  code: string
): ThunkAction<Promise<void>, stateValue, unknown, AnyAction> {
  return async (dispatch) => {
    const entry = 'login'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    const res = await fetch('/api/github-login', {
      method: 'POST',
      body: code,
    })

    try {
      let result = await res.json()

      if (result !== undefined || null) {
        dispatch({ type: SET_USER, payload: result })
        localStorage.setItem('accessToken', result.accessToken)
      } else {
        dispatch(addError({ [entry]: 'Ошибка входа' }))
      }

      dispatch(removeLoading(entry))
    } catch (err) {
      console.log(err);

      dispatch(addError({ [entry]: 'Что-то пошло не так...' }))
      dispatch(removeLoading(entry))
    }
  }
}
