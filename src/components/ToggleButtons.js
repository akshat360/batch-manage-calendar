import React from 'react'
import style from '../styles/global.module.scss'
import cx from "classnames";

export default function ToggleButtons(props)
{
    const {viewType,  setViewType } = props;
    const handleOnclick = ({ target}) =>{
        const {id } = target;
        setViewType(id);
    }

    const toggleButtons = ["day", "week", "month"]

    return (
        <div className={style.toggleButtons}>
            {toggleButtons.map((id) => (
                <button
                    id={id}
                    onClick={handleOnclick}
                    className={cx(style.toggleButton, { [style.selected]: viewType === id })}
                >
                    {id}
                </button>))
            }

        </div>
    )
}
