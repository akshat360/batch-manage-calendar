/** @format */

import React from 'react';
import './styles/_app.scss';
import Calendar from './components/Calendar';
// import MonthView from"./components/MonthView";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
	return (
		<div>
			<ToastContainer />
			<Calendar />
		</div>
	);
}
