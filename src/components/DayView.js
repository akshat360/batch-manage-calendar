import React, { useState, useEffect} from 'react'
import style from '../styles/dayView.module.scss'


export default function DayView(props){
    const { date, allDayhours , weeekDayNames} = props;
    weeekDayNames.push("Sunday");
    const todayDay = weeekDayNames[date.day()];

    return (
        <div>
            <div className={style.container}>
                <div>{todayDay }</div>
                <div>{ date.format("DD")}</div>
                <div className={style.timeRows}>
                    {allDayhours.map((time) => (<div className={style.timeRow}>
                        <div className={style.time}>{time}</div>
                        <div className={style.event}></div>
                    </div>))}
                </div>
            </div>
        </div>
    )
}
