/** @format */

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import style from '../styles/modal.module.scss';
import calendarStyle from '../styles/calendar.module.scss';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { BASE_URL } from '../projectSettings';
import { toast } from 'react-toastify';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		minHeight: '200px',
		padding: '2rem',
	},
};

export default function AddModal(props) {
	const { modalFor, open, setOpen } = props;
	const closeModal = () => setOpen(false);

	//arrs
	const [allBatches, setAllBatches] = useState([]);
	const [allTeachers, setAllTeachers] = useState([]);

	//values
	const [name, setName] = useState('');
	const [batchId, setBatchId] = useState('');
	const [teacherId, setTeacherId] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	const getAllBateches = () => {
		axios({
			method: 'get',
			url: BASE_URL + '/batch/all',
		})
			.then(({ data }) => {
				if (data.status) setAllBatches(data.data);
				else {
					toast.error(data.message);
				}
			})
			.catch(({ response }) => toast.error(response.data.message));
	};

	const getAllTeachers = () => {
		axios({
			method: 'get',
			url: BASE_URL + '/teachers/all',
		})
			.then(({ data }) => {
				if (data.status) setAllTeachers(data.data);
				else {
					toast.error(data.message);
				}
			})
			.catch(({ response }) => toast.error(response.data.message));
	};
	useEffect(() => {
		getAllBateches();
		getAllTeachers();
	}, []);

	const title =
		modalFor === 'teacher'
			? 'Add Teacher'
			: modalFor === 'assign'
			? 'Assign Teacher'
			: 'Add Batch';
	const btnText = modalFor === 'assign' ? 'Assign' : 'Add';

	const batchBody = (
		<div className={style.form}>
			<div>
				<input
					className={calendarStyle.input}
					onChange={({ target }) => setName(target.value)}
					placeholder='Add Batch Name'
				/>
			</div>
		</div>
	);

	const teacherBody = (
		<div className={style.form}>
			<div>
				<input
					className={calendarStyle.input}
					onChange={({ target }) => setName(target.value)}
					placeholder='Add Batch Name'
				/>
			</div>
		</div>
	);

	const assignBody = (
		<div className={style.form}>
			<div>
				<select
					onChange={({ target }) => setBatchId(target.value)}
					placeholder='Select Batch'
					className={calendarStyle.input}>
					<option value='' disabled>
						Select Batch
					</option>
					{allBatches.map(b => (
						<option key={b.ID} value={b.ID}>
							{b.name}
						</option>
					))}
				</select>
			</div>
			<div>
				<select
					onChange={({ target }) => setTeacherId(target.value)}
					placeholder='Select Batch'
					className={calendarStyle.input}>
					<option value='' disabled>
						Select Teacher
					</option>
					{allTeachers.map(b => (
						<option key={b.ID} value={b.ID}>
							{b.name}
						</option>
					))}
				</select>
			</div>
			<div>
				<center>Start Time</center>
				<input
					className={calendarStyle.input}
					type='datetime-local'
					name='startTime'
					onChange={({ target }) => setStartTime(target.value)}
				/>
			</div>
			<div>
				<center>End Time</center>
				<input
					className={calendarStyle.input}
					type='datetime-local'
					name='endTime'
					onChange={({ target }) => setEndTime(target.value)}
				/>
			</div>
		</div>
	);

	const modalBody =
		modalFor === 'teacher'
			? teacherBody
			: modalFor === 'assign'
			? assignBody
			: batchBody;

	return (
		<Modal
			isOpen={open}
			// onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel='Modal'>
			<div className={style.container}>
				<div className={style.close}>
					<FontAwesomeIcon onClick={closeModal} icon={faTimesCircle} />
				</div>
				<h2 className={style.h2}>{title}</h2>
				{modalBody}
				<button
					className={calendarStyle.btn}
					onClick={() => {
						// closeModal();
						props.handleSubmit({
							name,
							batchId,
							teacherId,
							startTime,
							endTime,
						});
					}}>
					{btnText}
				</button>
			</div>
		</Modal>
	);
}
