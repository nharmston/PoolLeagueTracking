import React, { useState, useEffect } from "react";
import data from "./leagueData.json"

export const dynamicTable = () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        setTableData(data);
    }, []);

return (
    <div>
      <h1>Dynamic Table</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Team</th>
            <th>Games</th>
            <th>Avg Pts</th>
            <th>Total Pts</th>
            <th>Wins</th>
            <th>Consec</th>
            <th>EOB</th>
            <th>ERO</th>
            <th>10-0</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.teamName}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default dynamicTable;