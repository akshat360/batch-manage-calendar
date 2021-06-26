/** @format */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendarWeek,
	faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import style from '../styles/calendar.module.scss';
import SmallCalnder from './SmallCalnder';
import AddModal from './Modal';
import { BASE_URL } from '../projectSettings';
import axios from 'axios';

export default function SideBar(props) {
	const [openModal, setOpenModal] = useState(false);
	const [modalFor, setModalFor] = useState(true);

	const handleOpen = modalFor => () => {
		setModalFor(modalFor);
		setOpenModal(true);
	};

	const handleSubmit = ({ name, batchId, teacherId, startTime, endTime }) => {
		if (modalFor === 'batch') {
			axios({
				method: 'post',
				url: BASE_URL + '/batch/add',
				headers: {
					'Content-Type': 'application/json',
				},
				data: { name },
			});
		} else if (modalFor === 'teacher') {
			axios({
				method: 'post',
				url: BASE_URL + '/teachers/add',
				headers: {
					'Content-Type': 'application/json',
				},
				data: { name },
			});
		} else if (modalFor === 'assign') {
			axios({
				method: 'post',
				url: BASE_URL + '/classroom/add',
				headers: {
					'Content-Type': 'application/json',
				},
				data: { batchId, teacherId, startTime, endTime },
			});
		}
	};

	return (
		<div>
			<AddModal
				modalFor={modalFor}
				open={openModal}
				setOpen={setOpenModal}
				handleSubmit={handleSubmit}
			/>
			<div>
				<button className={style.btn} onClick={handleOpen('batch')}>
					<FontAwesomeIcon icon={faPlusCircle} />
					Add Batch
				</button>
				<button className={style.btn} onClick={handleOpen('teacher')}>
					<FontAwesomeIcon icon={faPlusCircle} />
					Add Teacher
				</button>
				<button className={style.btn} onClick={handleOpen('assign')}>
					<FontAwesomeIcon icon={faCalendarWeek} />
					Assign Teacher
				</button>
			</div>
			<input placeholder='Search teachers' className={style.input} />
			<SmallCalnder {...props} />
		</div>
	);
}
