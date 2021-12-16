import React, { useEffect, useState } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import activity from 'assets/icons/activity.svg'
import altAvatar from 'assets/icons/altAvatar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, TextArea } from 'components'
import { getComments, saveComment } from 'store/actions'

const Activity: React.FC = () => {
  const dispatch = useDispatch()
  const list = useSelector(({ comments }: stateValue) => comments)
  const userData = useSelector(({ user }: stateValue) => user?.data)

  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(getComments())
  }, [])

  const handlerSave = () => {
    if (userData) {
      dispatch(saveComment(comment))
      setComment('')
    } else {
      alert('Войдите в учетную запись')
    }
  }

  return (
    <div className={c(s.Ativity)}>
      <div className={c(s.titleContainer, 'mb-1')}>
        <Icon src={activity} size='s' />
        <div className={c('ml-1', 'font-w-600', 'font-s-xlarge')}>Activity</div>
      </div>
      <div className={c(s.CommentList, 'mb-1')}>
        {list?.map((i: any) => {
          return (
            <div className={c(s.Comment, 'mv-1')} key={i.node_id}>
              <div>
                <Icon
                  src={i.user?.avatar_url || altAvatar}
                  borderRad
                  size='s'
                  imgSize='32px'
                />
              </div>
              <div className={c(s.text, 'ml-05', 'font-w-400', 'font-s-large')}>
                <div className={c('p-05')}>{i.body}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={c(s.CommentWrite, 'mt-1')}>
        <div>
          <Icon
            src={userData?.avatar_url || altAvatar}
            borderRad
            size='s'
            imgSize='32px'
          />
        </div>
        <div className={c(s.Input, 'mh-05')}>
          <TextArea
            placeholder='Add a comment'
            classNames='p-05 border-none'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button small onClick={() => handlerSave()}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Activity
