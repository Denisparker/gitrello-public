import React from 'react'
import s from './style.module.sass'
import { Page } from 'components'
import LabelList  from './components/LabelList'


const KanbanBoard: React.FC = () => {
  return (
    <Page title='Kanban' withHeader classNames={s.background}>
      <LabelList />
    </Page>
  )
}

export default KanbanBoard
