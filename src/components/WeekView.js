/** @format */

import React, { useState, useEffect } from 'react';
import style from '../styles/weekView.module.scss';
import axios from 'axios';
import { BASE_URL } from '../projectSettings';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function WeekView(props) {
	const { header, weekDates, allDayhours } = props;
	const [events, setEvents] = useState([]);
	useEffect(() => {
		console.log('MonthView', weekDates);
		if (weekDates) {
			const startDate = weekDates[0].format('YYYY-MM-DD');
			const endDate = weekDates[6].format('YYYY-MM-DD');
			axios({
				method: 'post',
				url: BASE_URL + '/classroom/dates',
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					startDate,
					endDate,
				},
			})
				.then(({ data }) => {
					if (data.status) setEvents(data.data);
					else {
						toast.error(data.message);
					}
				})
				.catch(({ response }) => toast.error(response.data.message));
		}
	}, [weekDates]);

	return (
		<div>
			<div className={style.container}>
				<div className={style.weekNamesWrapper}>
					{['', ...header]?.map(w => (
						<div className={style.headerTop}>{w}</div>
					))}
					<div></div>
					{weekDates?.map(date => (
						<div className={style.headerbottom}>{date.format('DD')}</div>
					))}
					{allDayhours.map(time => (
						<>
							<div className={style.time}>{time}</div>
							{weekDates?.map(date => (
								<div className={style.monthDates}></div>
							))}
						</>
					))}
					{events.map(event => {
						const startTime = moment(event.startTime);
						const endTime = moment(event.endTime);

						const top1 =
							parseInt(startTime.format('hh')) * 60 +
							parseInt(startTime.format('mm'));
						const top2 =
							parseInt(endTime.format('hh')) * 60 +
							parseInt(endTime.format('mm'));
						const opacity = Math.random() + 0.5;
						const height = top2 - top1;
						return (
							<div
								className={style.weekEvent}
								style={{ top: top1, height, opacity }}>
								Teacher
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
