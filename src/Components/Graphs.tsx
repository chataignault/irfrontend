import React, { useState } from "react";
import Plot from "react-plotly.js";
import TransferList from "./TransferList";
// import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes ", value: "grapes" },
  { label: "Mango ", value: "mango" },
  { label: "Strawberry ", value: "strawberry", disabled: true },
];

export default class Graph extends React.Component {
  state = {
    IRData: [[]] as number[][],
    selected: [] as string[],
  };

  render() {
    // const [selected, setSelected] = useState([])

    const getData = () => {
      fetch("/ir_analysis")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.setState({ IRData: JSON.parse(data).array });
        });
    };
    // useEffect( () => {
    //   getData()
    // })

    // const n_curves = this.state.IRData.length
    // const len = this.state.IRData[0].length
    // if (n_curves > 0){
    //   const len = this.state.IRData.length}

    const curves = this.state.IRData.map((curve, idx) => {
      return {
        x: Array(curve.length).keys(),
        y: curve,
        name: `Component ${idx + 1}`,
      };
    });

    return (
      <>
        {/* <MultiSelect
        className='multiselect'
        value={selected}
        options={options}
        onChange={setSelected}
        labelledBy='Select'/> */}
        <button onClick={getData}>Plot PCA</button>
        <TransferList />
        <Plot
          data={
            curves
            //   [
            //   {
            //     x: [1, 2, 3],
            //     y: [2, 6, 3],
            //     type: 'scatter',
            //     mode: 'lines+markers',
            //     marker: {color: 'red'},
            //   },
            //   {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
            //   {x: Array(len).keys(),
            //    y: this.state.IRData[0],
            //    type: 'scatter',
            //    name: 'component 1'}
            // ]
          }
          layout={{ title: "PCA", autosize: true }}
        />
      </>
    );
  }
}
