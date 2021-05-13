import React, {useState} from "react";
import {useHistory} from "react-router";
import formatReservationDate from "../utils/format-reservation-date";
import {today} from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api"

export default function NewReservation(){
const history = useHistory();

    const initialFormData = () => {
         return {
                first_name: "",
                last_name: "",
                mobile_number: "",
                reservation_date: "",
                reservation_time: "",
                people: 1,
            }
    }

    const [formData, setFormData] = useState({...initialFormData})
    const [wrongDates, setWrongDates] = useState([]);

    function isDateOk(){
        const reservationDate = new Date(formData.reservation_date);
        const errorsFound = [];
        const currentDate = new Date(today())

        if(reservationDate.getUTCDay() === 2){
            errorsFound.push({message: "Restaurant is closed on Tuesdays"});
        }

        if(reservationDate < currentDate){
            errorsFound.push({message: "Making reservations in the past is not allowed"})
        }
        setWrongDates(errorsFound);

        if(errorsFound.length > 0 ){
            return false;
        }

        return true;
    }

    function handleChange({ target }) {
        setFormData({ ...formData, [target.name]: target.value });
    }

   async function handleSubmit(event) {
        event.preventDefault();

        if(isDateOk()){
            await createReservation(formData).then((res) => history.push(`/dashboard?date=${formData.reservation_date}`))
            setFormData({...initialFormData})
            //history.push(`/dashboard?date=${formData.reservation_date}`)
        }
    }

    const errors = () => {
        return wrongDates.map((error, index) => <ErrorAlert key={index} error={error} />)
    }

    // const handleCancel = (event) => {
    //     event.preventDefault();
    //     setFormData({ ...initialFormData });
    //     //Check to see this is what is wanted
    //     history.push("/dashboard");
    // };

    return(
        <form>
            {errors()}
            <label htmlFor="first_name">First Name</label><br/>
            <input name="first_name" id="first_name" type="text" value={formData.first_name} onChange={handleChange} required/><br/>
            <label htmlFor="last_name">Last Name</label><br/>
            <input name="last_name" id="last_name" type="text" value={formData.last_name} onChange={handleChange} required/><br/>
            <label htmlFor="mobile_number">Mobile Name</label><br/>
            <input name="mobile_number" id="mobile_number" type="tel" value={formData.mobile_number} onChange={handleChange} required/><br/>
            <label htmlFor="reservation_date">Reservation Date</label><br/>
            <input name="reservation_date" id="reservation_date" type="date" value={formData.reservation_date} onChange={handleChange} required/><br/>
            <label htmlFor="reservation_time">Reservation Time</label><br/>
            <input name="reservation_time" id="reservation_time" type="time" value={formData.reservation_time} onChange={handleChange} required/><br/>
            <label htmlFor="people">Party Size</label><br/>
            <input name="people" id="people" type="number" onChange={formData.people} value={formData.people} min="1" max="6" required/><br/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={history.goBack}>Cancel</button>
        </form>
    )
}