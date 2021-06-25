import React, { useState, useEffect} from 'react'
import Modal from 'react-modal';
import style from '../styles/modal.module.scss'
import calendarStyle from '../styles/calendar.module.scss';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            minHeight: "200px",
            padding: "2rem"
        },
};
        
export default function AddModal(props){
    const {modalFor, open, setOpen } = props;
    const closeModal = () => setOpen(false);
    
    const title = modalFor === "teacher" ? "Add Teacher" : modalFor === "assign" ? "Assign Teacher" : "Add Batch";
    const btnText = modalFor === "assign" ? "Assign" : "Add";
    const [name, setName] = useState("")
    const batchBody = (
        <div className={style.form}>
            <div>
                <input
                    className={calendarStyle.input}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Add Batch Name" />
            </div>
        </div>);
    

    const teacherBody = (
        <div className={style.form}>
            <div><input className={calendarStyle.input} placeholder="Add Batch Name" /></div>
        </div>);
    
    const assignBody = (
        <div className={style.form}>
            <div>
                <select placeholder="Select Batch" className={calendarStyle.input} >
                    <option>Batch 1</option>
                    <option>Batch 2</option>
                    <option>Batch 3</option>
                </select>
            </div>
            <div>
                <select placeholder="Select Batch" className={calendarStyle.input} >
                    <option value="asd">teacher 1</option>
                    <option>teacher 2</option>
                    <option>teacher 3</option>
                </select>
            </div>
            <div>
                <input className={calendarStyle.input} type="datetime-local" id="birthdaytime" name="birthdaytime" />
            </div>
        </div>);
    
    const modalBody=modalFor === "teacher" ? teacherBody : modalFor === "assign" ? assignBody :batchBody;

    return (
        <Modal
            isOpen={open}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
        >
            <div className={style.container}>
                <div className={style.close} >
                    <FontAwesomeIcon onClick={closeModal} icon={faTimesCircle} />
                </div>
                <h2 className={style.h2} >{title}</h2>
                {modalBody}
                <button
                    className={calendarStyle.btn}
                    onClick={() => props.handleSubmit({name})}>
                    {btnText}
                </button>

            </div>
      </Modal>
    )
}

