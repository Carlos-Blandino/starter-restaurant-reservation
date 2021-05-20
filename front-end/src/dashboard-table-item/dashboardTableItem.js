import React from "react";
import { useHistory } from "react-router-dom";

export default function DashboardTableItem({ id, tables }) {
    const history = useHistory();
	if(!tables) return null;

    function handleFinish() {
		if(Window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
			// delete request here, we will add this later
			history.push("/dashboard");
		}
	}
	return (
        tables.filter((e) => e.table_id === id)
        .map((e) => 
		<tr key={e.table_id}>
			<th scope="row">{e.table_id}</th>
			<td>{e.table_name}</td>
			<td>{e.capacity}</td>
			
			{ /* the instructions say the tests are looking for this data-table-id-status, so be sure to include it. */ }
			<td data-table-id-status={e.table_id}>{e.status}</td>
            {e.status === "occupied" &&
			<td data-table-id-finish={e.table_id}>
				<button onClick={handleFinish} type="button">Finish</button>
			</td>
		}

		</tr>
	    )
    )
}