import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import TransferList from "./TransferList";

const options = [
  { label: "Grapes ", value: "grapes" },
  { label: "Mango ", value: "mango" },
  { label: "Strawberry ", value: "strawberry", disabled: true },
];

export default function Graph() {
  const [state, setState] = useState({
    IRData: [[]] as any, //number[][],
    selected: [] as any, //string[],
  });

    const getData = () => {
      fetch("http://127.0.0.1:8000/ir_analysis/")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log("PCA: ")
          console.log(data);
          setState({ IRData: JSON.parse(data).array, selected: [] });
        });
    };
    useEffect( () => {
      getData()
    }, [])


    const curves = state.IRData.map((curve:any, idx:any) => {
      return {
        x: Array(curve.length).keys(),
        y: curve,
        name: `Component ${idx + 1}`,
      };
    });

    return (
      <>
        <button onClick={getData}>Plot PCA</button>
        <Plot
          data={
            curves
          }
          layout={{ title: "PCA", autosize: true }}
        />
      </>
    );
  }
