import React, { useEffect } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import IssueCard from './components'

interface I {
  data: any
}

const LabelColumn: React.FC<I> = ({ data }) => {
  return (
    <Droppable droppableId={data.url}>
      {(provided) => (
        <div className={c(s.Label, 'mr-05')}>
          <div className={c(s.LabelHeader, 'pv-05', 'ph-1')}>
            <div className='font-s-large, font-w-700'>{data.name}</div>
            <div>...</div>
          </div>
          <div
            className={c(s.IssueBlock, 'mh-05 mv-1')}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {(data.issuesList as any[]).map((i, num) => (
              <IssueCard index={num} key={i.url} data={i} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default LabelColumn
