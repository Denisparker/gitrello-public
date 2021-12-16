import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer } from './reducer'

const makeStore = () =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

// export an assembled wrapper
export const storeWrapper = createWrapper(makeStore)
