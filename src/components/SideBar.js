import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import style from '../styles/calendar.module.scss'
import SmallCalnder from './SmallCalnder'

export default function SideBar(props) {
    return (
        <div>
            Calender
            <div>
                <button className={style.btn}>
                    <FontAwesomeIcon icon={faPlusCircle} />Add Batch</button>
                <button className={style.btn}>
                    <FontAwesomeIcon icon={faPlusCircle} />Add Teacher</button>
            </div>
            <SmallCalnder {...props}/>
        </div>
    )
}
