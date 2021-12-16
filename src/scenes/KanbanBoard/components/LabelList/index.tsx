import React from 'react'
import s from './style.module.sass'
import c from 'classnames'
import LabelColumn from './components/LabelColumn'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import updateIssueLabel from 'store/actions/updateIssueLabel'
import Modal from './components/Modal'

const LabelList: React.FC = () => {
  const labels = useSelector(({ labels }: stateValue) => labels)
  const issues = useSelector(({ issues }: stateValue) => issues)
  const currentIssue = useSelector(({ currentIssue }: stateValue) => currentIssue)
  const dispatch = useDispatch()

  function getData() {
    return [{ url: "noneLabel", name: "No label", color: "" }, ...labels].map(i => ({
      ...i,
      issuesList: issues.filter(item => {
        if (i.url === "noneLabel" && !item.labels?.length) {
          return true
        } else {
          return item?.labels[0]?.url === i.url
        }
      })
    }))
  }
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    
    dispatch(updateIssueLabel(
      result.draggableId,
      result.destination.droppableId
    ))
  }

  return (
    <div className={c(s.LabelList, 'pv-3')}>
      <div className={c(s.layout, 'ph-7')}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {getData().map(i => (
            <LabelColumn key={i.url} data={i} />
          ))}
        </DragDropContext>
      </div>
      {currentIssue && (
        <Modal />
      )}
    </div>
  )
}

export default LabelList
