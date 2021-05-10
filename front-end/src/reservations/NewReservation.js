import React, {useState} from "react";
import {useHistory} from "react-router";
import formatReservationDate from "../utils/format-reservation-date";

export default function NewReservation(){
const history = useHistory();

    const initialFormState = () => {
         return {
                first_name: "",
                last_name: "",
                mobile_number: "",
                reservation_date: "",
                reservation_time: "",
                people: 0,
            }
    }

    const [formData, setFormData] = useState(initialFormState)


    function handleChange({ target }) {
        setFormData({ ...formData, [target.name]: target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        history.push(`/dashboard?date=${formatReservationDate(formData.reservation_date)}`);
    }

    return(
        <form>
            <label htmlFor="first_name">First Name</label>
            <input name="first_name" id="first_name" type="text" value={formData.first_name} onChange={handleChange} required/>
            <label htmlFor="last_name">Last Name</label>
            <input name="last_name" id="last_name" type="text" value={formData.last_name} onChange={handleChange} required/>
            <label htmlFor="mobile_number">Mobile Name</label>
            <input name="mobile_number" id="mobile_number" type="tel" value={formData.mobile_number} onChange={handleChange} required/>
            <label htmlFor="reservation_date">Reservation Date</label>
            <input name="reservation_date" id="reservation_date" type="date" value={formData.reservation_date} onChange={handleChange} required/>
            <label htmlFor="reservation_time">Reservation Time</label>
            <input name="reservation_time" id="reservation_time" type="time" value={formData.reservation_time} onChange={handleChange} required/>
            <label htmlFor="people">Party Size</label>
            <input name="people" id="people" type="number" onChange={formData.people} value={formData.people} required/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={history.goBack}>Cancel</button>
        </form>
    )
}