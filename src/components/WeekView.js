import React, { useState, useEffect} from 'react'
import style from '../styles/weekView.module.scss'


export default function WeekView(props){
    const { header, weekDates, allDayhours } = props;
    
    return (
        <div>
            <div className={style.container}>
                <div className={style.weekNamesWrapper}>
                    {["", ...header]?.map((w) => <div className={style.headerTop}>{w}</div>)}
                    <div></div>{weekDates?.map((date) => (<div className={style.headerbottom}>{date.format("DD")}</div>))}
                    {allDayhours.map((time) => (
                        <>
                            <div className={style.time}>{time}</div>
                            {weekDates?.map((date) => (<div className={style.monthDates}></div>))}
                        </>
                    ))}

                </div>
            </div>
        </div>
    )
}
