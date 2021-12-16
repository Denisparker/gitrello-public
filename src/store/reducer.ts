import _ from 'lodash'
import { AnyAction } from 'redux'
import * as t from './actions/types'

const initialState: stateValue = {
  errors: {},
  loadings: [],
  user: null,
  issues: [],
  labels: [],
  comments: [],
  currentIssue: null,
  repo: { repo: '', owner: '' },
}

export function reducer(state = initialState, { type, payload }: AnyAction) {
  switch (type) {
    /// Loading and Errors
    case t.ADD_LOADING:
      return {
        ...state,
        loadings: _.uniq([...state.loadings, payload]),
      }
    case t.REMOVE_LOADING:
      return {
        ...state,
        loadings: state.loadings.filter((item) => item !== payload),
      }
    case t.ADD_ERROR: {
      const errorKey = Object.keys(payload)[0]
      const newErrors = { ...state.errors }
      newErrors[errorKey] = payload[errorKey]

      return {
        ...state,
        errors: newErrors,
      }
    }
    case t.REMOVE_ERROR: {
      const errorKey = payload
      const newErrors = { ...state.errors }
      delete newErrors[errorKey]

      return {
        ...state,
        errors: newErrors,
      }
    }
    ///
    case t.SET_USER: {
      return {
        ...state,
        user: payload,
      }
    }

    case t.SET_ISSUES: {
      return {
        ...state,
        issues: payload,
      }
    }

    case t.SET_CURRENT_ISSUE: {
      return {
        ...state,
        currentIssue: payload,
      }
    }

    case t.SET_LABELS: {
      return {
        ...state,
        labels: payload,
      }
    }

    case t.SET_REPO: {
      return {
        ...state,
        repo: payload
      }
    }

    case t.SET_COMMENTS: {
      return {
        ...state,
        comments: payload
      }
    }

    ///
    default:
      return state
  }
}
