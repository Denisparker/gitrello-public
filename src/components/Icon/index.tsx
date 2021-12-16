import React from 'react'
import s from './style.module.sass'
import c from 'classnames'

interface I {
  src: string
  size?: string
  classNames?: string
  imgSize?: string
  borderRad?: boolean
}

const Icon: React.FC<I> = ({
  src,
  size = 'm',
  imgSize,
  borderRad,
  classNames,
}) => {
  return (
    <div className={c(s.Icon, s[size], { [s.borderRad]: borderRad })}>
      <img src={src} alt={'icon'} width={imgSize} />
    </div>
  )
}

export default Icon
