import React, { useState } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import gitHubLogin from 'assets/icons/gitLogo.svg'
import { Button, Input, Page } from 'components/'
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { getIssues, login } from 'store/actions'
const LoginGithub = dynamic<any>(() => import('react-login-github'), {
  ssr: false,
})

const Login: React.FC = () => {
  const user = useSelector(({ user }: stateValue) => user)
  const error = useSelector(({ errors }: stateValue) => errors.getIssues)
  const loading = useSelector(({ loadings }: stateValue) => (
    loadings.includes('getIssues') || loadings.includes('login')
  ))
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleLoginSuccess = ({ code }: { code: string }) => {
    dispatch(login(code))
  }

  const handleClickSearch = async () => {
    dispatch(getIssues(url))
  }

  return (
    <Page title='Home'>
      <div className={c(s.LoginBlock)}>
        <div className={c(s.Block)}>
          {loading && (
            <div className={c(s.loading)}>
              <p className={c('font-w-700', 'font-s-large')}>Обработка запроса...</p>
            </div>
          )}
          <p className={c('font-w-700', 'font-s-large')}>Вход в Gitrello</p>
          {!user ? (
            <LoginGithub
              clientId={process.env.NEXT_PUBLIC_REACT_APP_CLIENT_ID}
              scope={['repo']}
              onSuccess={handleLoginSuccess}
              className={s.LoginButton}
            >
              <Button
                middle
                icon={gitHubLogin}
                classNames='font-w-700 font-s-large'
              >Войти через Github</Button>
            </LoginGithub>
          ) : (
            <Button
              middle
              disabled
              icon={gitHubLogin}
              classNames={c(s.LoginButton, 'font-w-700 font-s-large')}
            >{`Вы вошли как ${user.data?.login || "Unknown"}`}</Button>
          )}
          <Input
            type='url'
            placeholder='Введите ссылку на репозиторий'
            middle
            classNames='font-w-400'
            onChange={(e) => setUrl(e.target.value)}
            err={error}
          />
          <Button
            whiteColor
            green
            shadow
            middle
            classNames='font-w-600'
            onClick={() => handleClickSearch()}
          >Продолжить</Button>
        </div>
      </div>
    </Page>
  )
}

export default Login
