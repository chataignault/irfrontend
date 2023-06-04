import React from 'react'
import Graph from '../Components/Graphs'
import DataTable from '../Components/DataTable'

// FROM MUI
import Card from '@mui/material/Card';
import { CircularProgress } from '@mui/material';


export default class IRAnalysis extends React.Component {
    render() {
        return (
            <div className="two-columns">
            <DataTable/>
            <div>
            <Graph/>
            <DataTable/>
            <CircularProgress value={1} />
            <Card variant="outlined">{<p>Nothing</p>}</Card>
            {/* <ContactPage /> */}
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            </div>
            </div>
        )
        }
}