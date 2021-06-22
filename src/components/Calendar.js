import React, { useState, useEffect} from 'react'

import style from '../styles/calendar.module.scss'

import moment from 'moment';

import ToggleButtons from './ToggleButtons';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

export default function Calendar() {
    const today = moment();
	const getWeekNumber = Math.ceil(today.date() / 7)-1;

	const weeekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
	const allDayhours = getDayHours();
    
	const [monthDates, setMonthDates] = useState([])
	const [viewType, setViewType] = useState("month");

	
    useEffect(() =>{
        setMonthDates(getCalender());
	}, []);
	
	console.log("getWeekNumber",getWeekNumber, monthDates, today.week(), )
	
	return (
		<div className={style.container}>
			<ToggleButtons setViewType={setViewType}/>
			{viewType==="month" && <MonthView header={weeekDayNames} monthDates={monthDates}  />}
			{viewType === "week" && <WeekView
				header={weeekDayNames}
				weekDates={monthDates[getWeekNumber]}
				allDayhours={allDayhours}
			/>}
			{viewType === "day" && <DayView
				weeekDayNames={weeekDayNames}
				date={today}
				allDayhours={allDayhours}
			/>}
		</div> 
	)
}

//utils
 const getCalender=() =>{
        const calendar = [];
        const today = moment();
        const startDay = today.clone().startOf('month').startOf('week');
        const endDay = today.clone().endOf('month').endOf('week');

        let date = startDay.clone().subtract(1, 'day');

        while (date.isBefore(endDay, 'day')) 
            calendar.push( Array(7).fill(0).map(() => date.add(1, 'day').clone()));
	 return calendar;
 }
 const getDayHours= ()=> {
  const items = [];
  new Array(24).fill().forEach((acc, index) => {
    items.push(moment( {hour: index} ).format('h:mm A'));
    // items.push(moment({ hour: index, minute: 30 }).format('h:mm A'));
  })
  return items;
}