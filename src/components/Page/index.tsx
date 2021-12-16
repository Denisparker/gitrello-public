import Head from 'next/head'
import React, { useEffect } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'store/actions'
import { Icon } from 'components'
import altAvatar from 'assets/icons/altAvatar.svg'
interface I {
  title: string
  withHeader?: boolean
  classNames?: string
}

const Page: React.FC<I> = ({ title, withHeader, children, classNames }) => {
  const userData = useSelector(({ user }: stateValue) => user?.data || null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
    }
  }, [])

  return (
    <div className={c(s.Page, classNames)}>
      <Head>
        <title>{title}</title>
      </Head>
      {withHeader && (
        <div className={c(s.Header)}>
          <div className={c('font-s-xlarge', 'font-w-700', 'color-white')}>
            Gitrello
          </div>
          <div onClick={() => console.log('1')}>
            <Icon src={userData ? userData.avatar_url : altAvatar} size={'l'} imgSize='32px' borderRad/>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default Page
