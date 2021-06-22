import React from 'react'
import style from '../styles/global.module.scss'

export default function ToggleButtons(props)
{
    const { setViewType } = props;
    const handleOnclick = ({ target}) =>{
        const {id } = target;
        setViewType(id);
    }



    return (
        <div className={style.toggleButtons}>
            <button id="day" onClick={handleOnclick} className={style.toggleButton}>Day</button>
            <button id="week" onClick={handleOnclick} className={style.toggleButton}>Week</button>
            <button id="month" onClick={handleOnclick} className={style.toggleButton}>Month</button>
        </div>
    )
}
