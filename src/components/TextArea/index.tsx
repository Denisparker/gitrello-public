import React from 'react'
import s from './style.module.sass'
import c from 'classnames'

interface I {
  name?: string
  placeholder: string
  value: string
  classNames?: string
  onChange: (e: any) => void
}

const TextArea: React.FC<I> = ({
  name,
  placeholder,
  value,
  onChange,
  classNames,
}) => {
  return (
    <textarea
      name={name}
      maxLength={500}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={c(s.TextArea, classNames)}
    ></textarea>
  )
}

export default TextArea
