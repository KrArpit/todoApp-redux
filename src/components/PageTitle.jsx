import React from 'react'
import style from '../style/modules/title.module.scss'

function PageTitle({children}) {
  return (
    <p className={style.title}>{children}</p>
  )
}

export default PageTitle