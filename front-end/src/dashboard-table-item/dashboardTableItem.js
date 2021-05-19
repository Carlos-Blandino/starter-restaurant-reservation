import React from "react";

export default function DashboardTableItem({ id, tables }) {
	if(!tables) return null;


	return (
        tables.filter((e) => e.table_id === id)
        .map((e) => 
		<tr key={e.table_id}>
			<th scope="row">{e.table_id}</th>
			<td>{e.table_name}</td>
			<td>{e.capacity}</td>
			
			{ /* the instructions say the tests are looking for this data-table-id-status, so be sure to include it. */ }
			<td data-table-id-status={e.table_id}>{e.status}</td>
		</tr>
	    )
    )
}