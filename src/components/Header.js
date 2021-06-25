import React from 'react'
import style from '../styles/header.module.scss'
import moment from 'moment';

export default function Header(props)
{
    const {date,viewType } = props;
    return (
        <div className={style.wrapper}>
            <div>
                <h2>BatchManger Pro</h2>
                <div><button className={style.button}>Today</button></div>
                <div className={style.date}>
                    {viewType==="day"? date.format("LL") :date.format("MMM YYYY")}
                </div>
            </div>
        </div>
    )
}
