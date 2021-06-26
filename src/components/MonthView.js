/** @format */

import React, { useState, useEffect } from 'react';
import style from '../styles/monthView.module.scss';
import axios from 'axios';
import { BASE_URL } from '../projectSettings';
import { toast } from 'react-toastify';

export default function MonthView(props) {
	const { header, monthDates } = props;
	const [events, setEvents] = useState([]);
	useEffect(() => {
		console.log('MonthView', monthDates);
		if (monthDates) {
			const startDate = monthDates[0]
				? monthDates[0][0].format('YYYY-MM-DD')
				: '';
			const endDate = monthDates[3]
				? monthDates[4][6].format('YYYY-MM-DD')
				: '';
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
	}, [monthDates]);

	return (
		<div className={style.container}>
			<div className={style.weekNamesWrapper}>
				{header.map(w => (
					<div className={style.weekNames}>{w}</div>
				))}
				{monthDates.map(weeks =>
					weeks?.map(date => (
						<div className={style.monthDates}>{date.format('DD')}</div>
					))
				)}
			</div>
		</div>
	);
}
