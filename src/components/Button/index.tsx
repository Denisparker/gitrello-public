import React from 'react'
import s from './style.module.sass'
import c from 'classnames'
import Icon from 'components/Icon'

interface I {
  classNames?: string
  onClick?: (e?: any) => void
  middle?: boolean
  small?: boolean
  shadow?: boolean
  disabled?: boolean
  whiteColor?: boolean
  green?: boolean
  icon?: string
}

const Button: React.FC<I> = ({
  classNames,
  onClick,
  disabled,
  middle,
  small,
  shadow,
  whiteColor,
  green,
  icon,
  children
}) => {
  const handleClick = (e?: any) => {
    if (onClick)
      if (!disabled)
        onClick(e)
  }
  return (
    <div
      className={c(s.Button, classNames, {
        [s.middle]: middle,
        [s.small]: small,
        [s.disabled]: disabled,
        [s.whiteColor]: whiteColor,
        [s.green]: green,
        [s.shadow]: shadow,
      })}
      onClick={handleClick}
    >
      {icon && (
        <div className='ph-05'>
          <Icon src={icon} />
        </div>
      )}
      {children}
    </div>
  )
}

export default Button
