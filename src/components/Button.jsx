import React from 'react'
import style from '../style/modules/button.module.scss'
import { combineClasses } from '../utils/combineClasses'

function Button({children, type, varient, ...rest}) {
  return (
    <button 
      className={combineClasses([style.button, style[`button--${varient}`]])}
      type = {type === "submit"?"submit":"button"}
      {...rest}>
        {children}
    </button>
  )
}

function SelectButton({children, ...rest}){
  return(
    <select 
      className={combineClasses([style.button, style.button__select])}
      {...rest}>
      {children}
        </select>
  )
}
export {SelectButton}
export default Button