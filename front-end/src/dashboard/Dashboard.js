import React, {useEffect, useState} from "react";
import {listReservations} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {previous, next, today} from "../utils/date-time";
import {useHistory} from "react-router";
import  DashboardItem  from "../DashboardItem/DashboardItem";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date}) {
    const history = useHistory();
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
    const [dateState, setDateState] = useState("");


    useEffect(loadDashboard, [date]);

    function loadDashboard() {
        const abortController = new AbortController();
        setReservationsError(null);
        listReservations({dateState}, abortController.signal)
            .then(setReservations)
            .catch(setReservationsError);
        return () => abortController.abort();
    }

    return (
        <main>
            <h1>Dashboard</h1>
            <div className="d-md-flex mb-3">
                <h4 className="mb-0">Reservations for date {dateState}</h4>
            </div>
            <ErrorAlert error={reservationsError}/>

            {JSON.stringify(reservations)}

            <button type="button" onClick={() => history.push(`/dashboard?date=${previous(dateState)}`)}>Previous
            </button>
            <button type="button" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
            <button type="button" onClick={() => history.push(`/dashboard?date=${next(dateState)}`)}>Next</button>

            <div className="row">
                <DashboardItem date={dateState} reservations={reservations}/>
            </div>
        </main>
    );
}

export default Dashboard;
