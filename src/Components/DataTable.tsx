import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "../Components/Table";

export default function DataTable() {
  const [specifyFile, setSpecifyFile] = useState("TNX");
  const [header, setHeader] = useState([] as string[]);
  const [body, setBody] = useState([] as (string | number)[]);
  const [nRows, setnRows] = useState(10);

  const handleFileChange = (inputValue: string) => {
    setSpecifyFile(inputValue);
  };

  const handlenRowsChange = (inputValue: number) => {
    setnRows(inputValue);
  };

  const onFileChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleFileChange(event.target.value);
  };
  const onFileChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.value);
  };

  const onnRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlenRowsChange(parseInt(event.target.value));
  };

  const getData = () => {
    console.log("Start connection");
    try {
      fetch(`http://127.0.0.1:8000/yf/ticker/^${specifyFile}?n_rows=${nRows}`)
        .then((response) => {
          return response.json();
        })
        .catch((err) => alert(`The backend surely cant be reached \n ${err}`))
        .then((data) => {
          console.log("data\n");
          console.log(data);
          const data_json = JSON.parse(data);
          console.log(data_json);
          setHeader(Object.keys(data_json[0]));
          setBody(data_json);
          console.log(Object.keys(data_json[0]));
          console.log("Went there");
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log("Error fetch data", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Main">
      <h3>Hand-made table</h3>
      <Container fluid="md">
        <Col>
          <Row>
            <button
              onClick={() => {
                getData();
              }}
              className="App-button"
            >
              {" "}
              Refresh table{" "}
            </button>
            <select onChange={onFileChangeSelect}>
              <option value="IRX">13W</option>
              <option value="FVX">5Y</option>
              <option value="TNX">10Y</option>
              <option value="TYX">30Y</option>
            </select>
            <input
              placeholder="file name"
              type="text"
              required
              value={specifyFile}
              onChange={onFileChangeInput}
            />
            <input
              className="Table-n-rows"
              placeholder="n rows"
              type="number"
              onChange={onnRowsChange}
              value={nRows}
            />
          </Row>
          <Row>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Table className="App-table" content={body} header={header} />
            </div>
          </Row>
        </Col>
      </Container>
    </div>
  );
}
