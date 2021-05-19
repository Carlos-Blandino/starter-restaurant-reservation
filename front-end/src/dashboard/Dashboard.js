import React, {useEffect, useState} from "react";
import {listReservations} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {previous, next, today} from "../utils/date-time";
import {useHistory, useParams} from "react-router";
import  DashboardItem  from "../DashboardItem/DashboardItem";
import DashboardTableItem from "../dashboard-table-item/dashboardTableItem";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date, reservations, reservationsError, tables, tablesError}) {

    const history = useHistory();
   

    useEffect(loadDashboardTable);

    function loadDashboardTable() {
        //fetch the table data
    }

    return (
        <main>
            <h1>Dashboard</h1>    
            <div><br/>
            
            <button type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous
            </button>
            <button type="button" onClick={() => history.push(`/dashboard?date=${today()}`)}>Today</button>
            <button type="button" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
            </div>
            <div className="d-md-flex mb-3">
                <h4 className="mb-0">Reservations for date {date}</h4>
              
          
            </div>
            <ErrorAlert error={reservationsError}/>
            <table class="table">
		
			<thead>
			
				<tr>
					<th scope="col">ID</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Mobile Number</th>
					<th scope="col">Time</th>
					<th scope="col">People</th>
					<th scope="col">Status</th>
					<th scope="col">Seat Table</th>
				</tr>
			</thead>
			
			<tbody>
        
                <DashboardItem date={date} reservations={reservations}/>
            
			</tbody>

            </table>

            <h4 className="mb-0">Tables</h4>

		<ErrorAlert error={tablesError} />

		<table class="table">

			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Table Name</th>
					<th scope="col">Capacity</th>
					<th scope="col">Status</th>
				</tr>
			</thead>
				
			<tbody>
				<DashboardTableItem tables={tables}/>
			</tbody>

		</table>

        </main>
    );
}

export default Dashboard;
