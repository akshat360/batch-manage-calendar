import React from 'react'
import style from '../styles/smallCalndar.module.scss'

export default function SmallCalnder(props)
{
    const { header, monthDates}=props;
    
    return (
        <div className={style.container}>
            <div className={style.monthDates}>
                {header.map((w) => <div className={style.weekName}>{w.charAt(0)}</div>)}
                {monthDates.map((weeks) => weeks?.map((date)=>(<div className={style.dateName}>{date.format("DD")}</div>)))}
            </div>
        </div>
    )
}
