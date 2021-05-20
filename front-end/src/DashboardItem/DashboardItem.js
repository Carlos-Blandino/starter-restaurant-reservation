import React from "react";

export default function DashboardItem({date, reservations}) {
    function handleCancel() {
		if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
			// api call

			window.location.reload(); 
		}
	}
    return (
        
                reservations.filter((e) => e.reservation_date === date)
                        .map((e) => {
                            if(!e || e.status === "finished") {
                            return null;
                        }  else {
                           return  <tr key={e.reservation_id} >
           <th scope="row">{e.reservation_id}</th>
            <td>{e.first_name}</td>
            <td>{e.last_name}</td>
            <td>{e.mobile_number}</td>
            <td>{e.reservation_time}</td>
            <td>{e.people}</td>

            <td data-reservation-id-status={e.reservation_id}>{e.status}</td>
            <td>
            
				<a href={`/reservations/${e.reservation_id}/edit`}>
					<button type="button">Edit</button>
				</a>
			</td>

			<td>
				<button type="button" onClick={handleCancel} data-reservation-id-cancel={e.reservation_id}>
					Cancel
				</button>
			</td>
            {e.status === "booked" &&
            <td>
				<a href={`/reservations/${e.reservation_id}/seat`}>
					<button type="button">Seat</button>
				</a>
			</td>
            }     
            
        </tr>
              }} 
         )
    )
}