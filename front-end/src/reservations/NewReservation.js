import React, {useState} from "react";
import {useHistory} from "react-router";
import formatReservationDate from "../utils/format-reservation-date";
import {today} from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api"

export default function NewReservation(){
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
        const history = useHistory();
        const [errors, setErrors] = useState([]);
        const [formData, setFormData] = useState({...initialFormData() });

        function handleChange({ target }) {
            setFormData({ ...formData, [target.name]: target.value });
        }

       async function handleSubmit(event) {

            event.preventDefault();

            const foundErrors = [];

            if(validateFields(foundErrors) && validateDate(foundErrors)) {
                await createReservation(formData)
                    .then((res) => history.push(`/dashboard?date=${formData.reservation_date}`))
                setFormData({...initialFormData})
               // history.push(`/dashboard?date=${formData.reservation_date}`);
            }

            setErrors(foundErrors);
        }


        function validateFields(foundErrors) {
            for(const field in formData) {
                if(formData[field] === "") {
                    foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
                }
            }
            if(foundErrors.length > 0) {
                return false;
            }
            return true;
        }

        function validateDate(foundErrors) {
            const reserveDate = new Date(`${formData.reservation_date}T${formData.reservation_time}:00.000`);
            const todaysDate = new Date();

            if(reserveDate.getDay() === 2) {
                foundErrors.push({ message: "Restaurant is closed on Tuesdays." });
            }

            if(reserveDate < todaysDate) {
                foundErrors.push({ message: "Date is in the past." });
            }

            if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)) {
                foundErrors.push({ message: "Restaurant is not open until 10:30AM." });
            }
            else if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)) {
                foundErrors.push({ message: "Restaurant is closed after 10:30PM." });
            }
            else if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)) {
                foundErrors.push({ message: "Reservation must be made at least an hour before closing (10:30PM)." })
            }

            if(foundErrors.length > 0) {
                return false;
            }
            return true;
        }

        const displayErrors = () => {
            return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
        }

    return(
        <form>
            {displayErrors()}
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
            <input name="people" id="people" type="number" onChange={formData.people} defaultValue="1" value={formData.people} min="1" max="6" required/><br/>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={history.goBack}>Cancel</button>
        </form>
    )
}