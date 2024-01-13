import React, { useEffect, useState, useRef, useMemo } from "react";
import Graph from "../Components/Graphs";
import DataTable from "../Components/DataTable";
import LineChartExample from "../Components/LineChart";
import connexionStore from "../connexionStore"

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";

interface DataTypeEx {
  mission: string;
  company: string;
  location: string;
  date: string;
  rocket: string;
  price: number;
  successful: boolean;
}

function GridEx() {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", minWidth: 200 }),
    [],
  );
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
    };
  }, []);
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<DataTypeEx[]>([
    {
      mission: "Voyager",
      company: "NASA",
      location: "Cape Canaveral",
      date: "1977-09-05",
      rocket: "Titan-Centaur ",
      price: 86580000,
      successful: true,
    },
    {
      mission: "Apollo 13",
      company: "NASA",
      location: "Kennedy Space Center",
      date: "1970-04-11",
      rocket: "Saturn V",
      price: 3750000,
      successful: false,
    },
    {
      mission: "Falcon 9",
      company: "SpaceX",
      location: "Cape Canaveral",
      date: "2015-12-22",
      rocket: "Falcon 9",
      price: 9750000,
      successful: true,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "mission" },
    { field: "company" },
    { field: "location" },
    { field: "date" },
    { field: "price" },
    { field: "successful" },
    { field: "rocket" },
  ]);


  return (
    <div className="GridEx">
      <h2> ag-grid example</h2>
      <div style={containerStyle} className="ag-theme-quartz">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          rowHeight={50}
        />
      </div>
    </div>
  );
}

const IRAnalysis: React.FC = () => {

  const [data, setData] = useState<number[]>([])

  const getData = () => {
    // fetch(connexionStore['local'])
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //   })
    //   .then((data) => {
    //     console.log("PCA: ");
    //     console.log(data);
    //     setData(JSON.parse(data).array);
    //   });
    setData([1, 2, 3, 3, 1, 2, 3])
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div main-container>
      <Box>
        <Grid container md={12} rowSpacing={10}>
          <Grid item md={8} sx={{ m: 0.5 }}>
            <GridEx />
          </Grid>
          <Grid item md={3.5}>
            <DataTable />
          </Grid>
          <Grid item md={12}>
            <Graph data={data} />
          </Grid>
          <Grid item md={12}>
            <LineChartExample />
          </Grid>
        </Grid>
      </Box>
      <DataTable />
    </div>
  );
}


export default IRAnalysis;
