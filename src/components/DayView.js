/** @format */

import React, { useState, useEffect } from 'react';
import style from '../styles/dayView.module.scss';
import axios from 'axios';
import { BASE_URL } from '../projectSettings';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function DayView(props) {
	const { date, allDayhours, weeekDayNames } = props;
	weeekDayNames.push('Sunday');
	const todayDay = weeekDayNames[date.day()];

	const [events, setEvents] = useState([]);

	useEffect(() => {
		console.log('date', date);
		if (date) {
			axios({
				method: 'post',
				url: BASE_URL + '/classroom/date',
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					date: date.format('YYYY-MM-DD'),
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
	}, [date]);
	return (
		<div>
			<div className={style.container}>
				<div>{todayDay}</div>
				<div>{date.format('DD')}</div>
				<div className={style.timeRows}>
					{allDayhours.map(time => (
						<div className={style.timeRow}>
							<div className={style.time}>{time}</div>
							<div className={style.event}></div>
						</div>
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
								className={style.dayEvent}
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
