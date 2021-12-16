import React from 'react'
import s from './style.module.sass'
import c from 'classnames'

interface I {
  type?: string
  placeholder?: string
  classNames?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  middle?: boolean
  disable?: boolean
  err?: string
}

const Input: React.FC<I> = ({
  type,
  placeholder,
  classNames,
  onChange,
  disable,
  middle,
  err,
}) => {
  return (
    <div className={s.Block}>
      <input
        type={type}
        placeholder={placeholder}
        className={c(
          s.Input,
          {
            [s.middle]: middle,
            [s.disable]: disable,
          },
          'p-1',
          classNames
        )}
        onChange={onChange}
      />
      <p className={c(s.err, !err && s.errHide, 'font-w-400, font-s-small')}>
        {err}
      </p>
    </div>
  )
}

export default Input
