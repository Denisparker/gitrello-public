import React from 'react'
import s from './style.module.sass'
import c from 'classnames'
import Activity from './components/Activity'
import description from 'assets/icons/description.svg'
import issueIcon from 'assets/icons/issueIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_ISSUE } from 'store/actions/types'
import { Icon } from 'components'
import getIssues from 'store/actions/getLabels'

const Modal: React.FC = () => {
  const data = useSelector(({ currentIssue }: stateValue) => currentIssue)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch({ type: SET_CURRENT_ISSUE, payload: null })
    dispatch(getIssues())
  }


  if (!data) {
    return null
  }

  return (
    <div className={c(s.Modal, 'pt-5')}>
      <div className={c(s.IssueModal, 'p-1')}>
        <div className={c(s.Content)}>
          <div className={c(s.Issues, 'mb-1')}>
            <div className={c(s.titleContainer)}>
              <Icon src={issueIcon} borderRad size='s' />
              <div className={c('ml-1 font-w-600 font-s-xlarge limit-string-1')}>
                {data.title}
              </div>
            </div>
            <div className={c('font-s-small', 'ml-2')}>in list {data.labels[0]?.name}</div>
          </div>
          <div className={c(s.Description, 'mb-1')}>
            <div className={c(s.titleContainer)}>
              <Icon src={description} size='s' />
              <div className={c('ml-1 font-w-600 font-s-xlarge')}>
                Description
              </div>
            </div>
            <div className={c(s.DetailedDescription, 'mt-1 ml-2')}>
              <div className={c('font-s-large p-05')}>{data.labels[0]?.description}</div>
            </div>
          </div>
          <Activity />
        </div>
        <div>
          <div className={c(s.Close)} onClick={handleClose}>
            ✕
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
