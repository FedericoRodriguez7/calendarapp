import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from "sweetalert2"
import 'react-datetime-picker/dist/DateTimePicker.css';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');



const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1,'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate()
}


export const CalendarModal = () => {

 

  const dispatch = useDispatch();

  const {modalOpen} = useSelector(state => state.ui);
  const {activeEvent} = useSelector(state => state.calendar);

  const [titleValid, setTitleValid] = useState(true)

  const [formValues, setFormValues] = useState(initEvent)

  const {notes, title, start, end} = formValues

  const handleInputChange = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    });
}

useEffect(() => {
  if ( activeEvent ) {
      setFormValues( activeEvent );
  } 
}, [activeEvent, setFormValues])


 const closeModal = (e) => {
  
      dispatch(uiCloseModal())
      dispatch(eventClearActiveEvent());
      setFormValues(initEvent)
    }

  const handleSubmitForm = (e) => {
    e.preventDefault();
  
    const momentStart = moment(start);
    const momentEnd = moment(end);

   
  
    // Comenté la línea original y cambié la llamada a closeModal()
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire("Error", "La fecha fin debe ser mayor a la fecha inicio", "error");
    }
  
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if ( activeEvent ) {
      dispatch( eventStartUpdate( formValues ) )
  } else {
    dispatch(eventStartAddNew(formValues))
  }

    
  
    setTitleValid(true);
    // Llamada a la función closeModal() en lugar de la función no definida
    closeModal();
    
  };

  const [dateStart, setDateStart] = useState( now.toDate())

  const handleStartDateChange = (e) => {
    setDateStart( e );
    setFormValues({
      ...formValues,
      start: e
      
    })
    console.log(e)
  }
  


const [dateEnd, setDateEnd] = useState( nowPlus1.toDate())

const handleEndDateChange = (e) => {
  setDateEnd( e );
  setFormValues({
    ...formValues,
    end: e
  })
  console.log(e)
}
 


  return (

    
    <Modal
    
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      closeTimeoutMS={200}
      style={customStyles}
      className={"modal"}
      overlayClassName={"modal-fondo"}
    >
      

      <h1> Nuevo evento </h1>
      <hr />
      <form className="container"
      onSubmit={handleSubmitForm}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DateTimePicker 
          onChange={handleStartDateChange}
           value={dateStart}
            />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DateTimePicker onChange={handleEndDateChange} value={dateEnd} minDate={dateStart} />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
      
    </Modal>
  )
}
