import React from "react";

export default function DashboardItem({date, reservations}) {

    //if(!reservations) return null;

    return (
  
                reservations.filter((e) => e.reservation_date === date)
                        .map((e) => 
        <tr key={e.reservation_id} >
           <th scope="row">{e.reservation_id}</th>
            <td>{e.first_name}</td>
            <td>{e.last_name}</td>
            <td>{e.mobile_number}</td>
            <td>{e.reservation_time}</td>
            <td>{e.people}</td>
            <td>{e.status}</td>
            <td>
				<a href={`/reservations/${e.reservation_id}/seat`}>
					<button type="button">Seat</button>
				</a>
			</td>
                        
            
        </tr>
                        
         )
    )
}