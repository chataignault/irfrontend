import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

export default function Graph(props: { data: number[] }) {
  // const curves = data.IRData.map((curve: any, idx: any) => {
  //   return {
  //     x: Array(curve.length).keys(),
  //     y: curve,
  //     name: `Component ${idx + 1}`,
  //   };
  // });
  const curves = [
    {
      x: Array(props.data.length).keys(),
      y: props.data,
      name: "Value",
    },
  ];

  return (
    <>
      <button onClick={() => {}}>Plot PCA</button>
      <Plot data={curves} layout={{ title: "PCA", autosize: true }} />
    </>
  );
}
