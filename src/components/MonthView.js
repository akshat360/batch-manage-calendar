import React, { useState, useEffect} from 'react'
import style from '../styles/monthView.module.scss'


export default function MonthView(props)
{
    const { header, monthDates}=props;


    return (
        <div className={style.container}>
            <div className={style.weekNamesWrapper}>
                {header.map((w) => <div className={style.weekNames}>{w}</div>)}
                {monthDates.map((weeks) => weeks?.map((date)=>(<div className={style.monthDates}>{date.format("DD")}</div>)))}
            </div>
        </div>
    )
}
