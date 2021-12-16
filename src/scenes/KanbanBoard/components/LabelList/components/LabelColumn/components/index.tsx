import React, { useEffect, useState } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import { Icon } from 'components'
import issueIcon from 'assets/icons/issueIcon.svg'
import altAvatar from 'assets/icons/altAvatar.svg'
import comments from 'assets/icons/comments.svg'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_ISSUE } from 'store/actions/types'

interface I {
  index: number
  data: any
}

const IssueCard: React.FC<I> = ({ index, data }) => {
  const isAdmin = useSelector(({ user }: stateValue) => user?.admin)
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch({
      type: SET_CURRENT_ISSUE,
      payload: data,
    })
  }

  return (
    <Draggable draggableId={data.url} index={index} isDragDisabled={isAdmin}>
      {(provided) => (
        <div
          className={c(s.Issue, 'pv-05 ph-05 mt-05')}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleOpen}
        >
          <div className={c(s.Header, 'pb-05')}>
            <Icon src={issueIcon} borderRad size='s' />
            <div className='pl-05 limit-string-1'>{data.title}</div>
          </div>
          <div className={c(s.Footer)}>
            <div className={c(s.Comments)}>
              <Icon src={comments} />
              <div className='font-w-400 font-s-small pl-05'>
                {data.comments}
              </div>
            </div>
            <Icon src={altAvatar} borderRad imgSize='28px'></Icon>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default IssueCard